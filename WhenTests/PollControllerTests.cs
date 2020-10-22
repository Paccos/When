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
    public class PollControllerTests
    {
        private readonly PollsController _pollsControllerToTest;
        private readonly PollContext _pollsContext;

        public PollControllerTests()
        {
            var optionsBuilder = new DbContextOptionsBuilder<PollContext>();
            optionsBuilder.UseInMemoryDatabase("WhenTest");

            _pollsContext = new PollContext(optionsBuilder.Options);
            _pollsControllerToTest = new PollsController(_pollsContext);
        }

        public static List<UserSelection> TestData()
        {
            var dateSelecitons = Enumerable
                .Range(1, 10)
                .Select(i => DateTime.Now.AddDays(i))
                .Select(d => new DateSelection { Date = d, State = SelectionState.No })
                .ToList();

            return new List<UserSelection> {
                new UserSelection { Name = "Bob", DateSelections = dateSelecitons },
                new UserSelection { Name = "Alice", DateSelections = dateSelecitons },
                new UserSelection { Name = "Chad", DateSelections = dateSelecitons }
            };
        }

        [Fact]
        public async void GetWithInvalidIdReturnsNotFoundAsync()
        {
            Guid id = new Guid();

            var result = await _pollsControllerToTest.GetPollAsync(id);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async void GetReturnsPollWithUserSelections()
        {
            var testPoll = new Poll { Title = "TestPoll", UserSelections = TestData() };
            await _pollsContext.AddAsync(testPoll);

            var id = testPoll.Id;

            var fetchedPoll = await _pollsControllerToTest.GetPollAsync(id);

            Assert.IsNotType<NotFoundResult>(fetchedPoll.Result);

            Assert.NotNull(fetchedPoll.Value);
            Assert.NotNull(fetchedPoll.Value.UserSelections);

            Assert.Equal(testPoll.Title, fetchedPoll.Value.Title);
            Assert.Equal(testPoll.UserSelections, fetchedPoll.Value.UserSelections);
        }

        [Fact]
        public async void PostWithoutRequiredDataReturnsBadRequest()
        {
            // Test with empty data
            var badPoll = new Poll();

            var result = await _pollsControllerToTest.PostPoll(badPoll);

            Assert.IsType<BadRequestObjectResult>(result.Result);

            // Test with empty title
            badPoll.UserSelections = TestData();

            result = await _pollsControllerToTest.PostPoll(badPoll);

            Assert.IsType<BadRequestObjectResult>(result.Result);

            // Test with empty UserSelection
            badPoll.UserSelections = new List<UserSelection>();
            badPoll.Title = "TestPoll";

            result = await _pollsControllerToTest.PostPoll(badPoll);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async void PostReturnsCreatedAtWithAuthorIdAndSortedDateSelections()
        {
            var testPoll = new Poll { Title = "TestPoll", UserSelections = TestData() };
            var result = await _pollsControllerToTest.PostPoll(testPoll);

            Assert.IsType<CreatedAtActionResult>(result.Result);

            var createdAtResult = result.Result as CreatedAtActionResult;
            var postedPoll = createdAtResult.Value as Poll;

            Assert.Equal(postedPoll.UserSelections[0].Id, postedPoll.AuthorId);

            var sortedTestSelections = testPoll.UserSelections
                .First()
                .DateSelections
                .OrderBy(ds => ds.Date).ToList();

            Assert.Equal(sortedTestSelections, postedPoll.UserSelections.First().DateSelections);
        }
    }
}
