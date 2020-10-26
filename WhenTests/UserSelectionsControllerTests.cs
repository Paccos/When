using System;
using Xunit;
using When.Controllers;
using Microsoft.EntityFrameworkCore;
using When.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;

namespace WhenTests
{
    public class UserSelectionsControllerTests
    {
        private readonly UserSelectionsController _userSelectionsControllerToTest;
        private readonly PollContext _pollsContext;

        public UserSelectionsControllerTests()
        {
            var optionsBuilder = new DbContextOptionsBuilder<PollContext>();
            optionsBuilder.UseInMemoryDatabase("WhenTest");

            _pollsContext = new PollContext(optionsBuilder.Options);
            _userSelectionsControllerToTest = new UserSelectionsController(_pollsContext);
        }

        // GET

        [Fact]
        public async void GetWithInvalidIdReturnsNotFoundAsync()
        {
            Guid id = new Guid();

            var result = await _userSelectionsControllerToTest.GetUserSelection(id);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async void GetReturnsUserSelection()
        {
            var testSelection = PollControllerTests.TestData()[0];
            await _pollsContext.AddAsync(testSelection);
            await _pollsContext.SaveChangesAsync();

            var id = testSelection.Id;

            var fetchedSelection = await _userSelectionsControllerToTest.GetUserSelection(id);

            Assert.IsNotType<NotFoundResult>(fetchedSelection.Result);

            Assert.NotNull(fetchedSelection.Value);
            Assert.NotNull(fetchedSelection.Value.DateSelections);
            Assert.NotNull(fetchedSelection.Value.Name);

            Assert.Equal(testSelection.Name, fetchedSelection.Value.Name);
            Assert.Equal(testSelection.DateSelections, fetchedSelection.Value.DateSelections);
        }

        // PUT

        [Fact]
        public async void PutWithWrongIdReturnsBadRequest()
        {
            var testSelection = PollControllerTests.TestData()[0];
            await _pollsContext.AddAsync(testSelection);
            await _pollsContext.SaveChangesAsync();
            var wrongId = new Guid();

            var putWithWrongId = await _userSelectionsControllerToTest.PutUserSelection(wrongId, testSelection);

            Assert.IsType<BadRequestResult>(putWithWrongId.Result);
        }

        [Fact]
        public async void PutWithInvalidIdReturnsNotFound()
        {
            var testSelection = PollControllerTests.TestData()[0];
            var id = new Guid();
            testSelection.Id = id;

            var putForMissingSelection = await _userSelectionsControllerToTest.PutUserSelection(id, testSelection);

            Assert.IsType<NotFoundResult>(putForMissingSelection.Result);
        }

        [Fact]
        public async void PutWithNewNameChangesName()
        {
            var testSelection = PollControllerTests.TestData()[0];
            await _pollsContext.AddAsync(testSelection);
            await _pollsContext.SaveChangesAsync();

            var newName = "I am new";
            testSelection.Name = newName;

            var putWithNewName = await _userSelectionsControllerToTest.PutUserSelection(testSelection.Id, testSelection);

            Assert.IsType<NoContentResult>(putWithNewName.Result);

            var changedSelection = await _pollsContext.UserSelections.FindAsync(testSelection.Id);

            Assert.Equal(newName, changedSelection.Name);
        }

        [Fact]
        public async void PutWithNewDateSelectionsChangesDateSelections()
        {
            var testSelection = PollControllerTests.TestData()[0];
            await _pollsContext.AddAsync(testSelection);
            await _pollsContext.SaveChangesAsync();

            var newSelection = new List<DateSelection>(testSelection.DateSelections);
            newSelection.ForEach(ds => ds.State = SelectionState.Yes);
            testSelection.DateSelections = newSelection;

            var putWithNewSelection = await _userSelectionsControllerToTest.PutUserSelection(testSelection.Id, testSelection);

            Assert.IsType<NoContentResult>(putWithNewSelection.Result);

            var changedSelection = await _pollsContext.UserSelections.FindAsync(testSelection.Id);

            Assert.Equal(newSelection, changedSelection.DateSelections);
        }

        // POST

        [Fact]
        public async void PostWithoutRequiredDataReturnsBadRequest()
        {
            // Test without any data
            var badUserSelection = new UserSelection();

            var result = await _userSelectionsControllerToTest.PostUserSelection(badUserSelection);

            Assert.IsType<BadRequestObjectResult>(result.Result);

            // Test without DateSelections
            badUserSelection.Name = "Alice";

            result = await _userSelectionsControllerToTest.PostUserSelection(badUserSelection);

            Assert.IsType<BadRequestObjectResult>(result.Result);

            // Test without Name
            badUserSelection.Name = "  ";
            badUserSelection.DateSelections = new List<DateSelection> {
                new DateSelection { Date = DateTime.Now, State = SelectionState.Maybe }
            };

            result = await _userSelectionsControllerToTest.PostUserSelection(badUserSelection);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async void PostReturnsCreatedAt()
        {
            var testSelection = PollControllerTests.TestData()[0];

            var result = await _userSelectionsControllerToTest.PostUserSelection(testSelection);

            Assert.IsType<CreatedAtActionResult>(result.Result);

            var createdAtResult = result.Result as CreatedAtActionResult;
            var postedSelection = createdAtResult.Value as UserSelection;

            Assert.Equal(testSelection.Name, postedSelection.Name);
            Assert.Equal(testSelection.DateSelections, postedSelection.DateSelections);
        }

        // DELETE

        [Fact]
        public async void DeleteWithInvalidIdReturnsNotFound()
        {
            var fakeId = new Guid();

            var deleteWithInvalidId = await _userSelectionsControllerToTest.DeleteUserSelection(fakeId);

            Assert.IsType<NotFoundResult>(deleteWithInvalidId.Result);
        }

        [Fact]
        public async void DeleteWithAuthorsIdReturnsBadRequest()
        {
            var testPoll = new Poll { Title = "TestPoll", UserSelections = PollControllerTests.TestData() };
            var userSelection = testPoll.UserSelections.First();
            userSelection.DateSelections = userSelection.DateSelections.OrderBy(ds => ds.Date).ToList();

            await _pollsContext.Polls.AddAsync(testPoll);

            testPoll.AuthorId = userSelection.Id;

            await _pollsContext.SaveChangesAsync();

            var deleteWithAuthorId = await _userSelectionsControllerToTest.DeleteUserSelection(testPoll.AuthorId);

            Assert.IsType<BadRequestObjectResult>(deleteWithAuthorId.Result);
        }

        [Fact]
        public async void DeleteWithValidIdRemovesUserSelection()
        {
            var testPoll = new Poll { Title = "TestPoll", UserSelections = PollControllerTests.TestData() };
            var userSelection = testPoll.UserSelections.First();
            userSelection.DateSelections = userSelection.DateSelections.OrderBy(ds => ds.Date).ToList();

            await _pollsContext.Polls.AddAsync(testPoll);

            testPoll.AuthorId = userSelection.Id;

            await _pollsContext.SaveChangesAsync();

            var lastId = testPoll.UserSelections.Last().Id;
            var deleteWithValidId = await _userSelectionsControllerToTest.DeleteUserSelection(lastId);

            Assert.IsType<ActionResult<UserSelection>>(deleteWithValidId);

            var deletedSelection = deleteWithValidId.Value;
            var deletedId = deletedSelection.Id;

            Assert.Equal(lastId, deletedId);
            Assert.Null(await _pollsContext.UserSelections.FindAsync(lastId));
        }
    }
}
