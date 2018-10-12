var home = require('../../controllers/home'),
	image = require('../../controllers/image'),
	express = require('express'),
	proxyquire = require('proxyquire');

var routerStub = {
			get: function( a, b ) {
				console.log(a);
			},
			post: sinon.spy(),
			delete: sinon.spy()
		};

describe('Routes', function(){	
		
	beforeEach(function(){
		
		
		app = {
			use: sinon.spy()
		};

		routerStub.get = sinon.spy();
		
		express.Router = function() {
					return routerStub;
				};
		
		routes = require('../../server/routes');
		routes(app);
	});
	
	describe('() call', function() {
		it('should handle ()', function() {
			expect(app.use).to.be.calledWith(routerStub);
		});
	});
	describe('GETs', function() {
        it('should handle /', function(){ 
            expect(routerStub.get).to.be.calledWith('/', home.index);
        });
        it('should handle /images/:image_id', function(){
            expect(routerStub.get).to.be.calledWith('/images/:image_id', image.index);
        });
    });
    describe('POSTs', function() {
        it('should handle /images', function(){
            expect(routerStub.post).to.be.calledWith('/images', image.create);
        });
        it('should handle /images/:image_id/like', function(){
            expect(routerStub.post).to.be.calledWith('/images/:image_id/like', image.like);
        });
        it('should handle /images/:image_id/comment', function(){
            expect(routerStub.post).to.be.calledWith('/images/:image_id/comment', image.comment);
        });
    });
    describe('DELETEs', function() {
        it('should handle /images/:image_id', function(){
            expect(routerStub.delete).to.be.calledWith('/images/:image_id', image.remove);
        });
    });
});

