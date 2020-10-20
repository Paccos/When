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

            var id = testSelection.Id;

            var fetchedSelection = await _userSelectionsControllerToTest.GetUserSelection(id);

            Assert.IsNotType<NotFoundResult>(fetchedSelection.Result);

            Assert.NotNull(fetchedSelection.Value);
            Assert.NotNull(fetchedSelection.Value.DateSelections);
            Assert.NotNull(fetchedSelection.Value.Name);

            Assert.Equal(testSelection.Name, fetchedSelection.Value.Name);
            Assert.Equal(testSelection.DateSelections, fetchedSelection.Value.DateSelections);
        }

        // TODO : Add tests for PUT, POST and DELETE
    }
}
