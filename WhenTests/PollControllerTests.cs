using System;
using Xunit;
using When.Controllers;
using Microsoft.EntityFrameworkCore;
using When.Models;
using Microsoft.AspNetCore.Mvc;

namespace WhenTests
{
    public class PollControllerTests
    {
        private readonly PollsController _pollsControllerToTest;

        public PollControllerTests()
        {
            var optionsBuilder = new DbContextOptionsBuilder<PollContext>();
            optionsBuilder.UseInMemoryDatabase("WhenTest");

            var context = new PollContext(optionsBuilder.Options);

            _pollsControllerToTest = new PollsController(context);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetWithInvalidIdReturnsNotFoundAsync()
        {
            Guid id = new Guid();

            var result = await _pollsControllerToTest.GetPollAsync(id);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public void GetReturnsPollWithUserSelections()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public void PostWithoutRequiredDataReturnsBadRequest()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public void PostReturnsCreatedAtWithAuthorIdAndSortedDateSelections()
        {
            throw new NotImplementedException();
        }
    }
}
