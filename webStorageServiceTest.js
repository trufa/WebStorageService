define(['squire'], function(Squire) {
  
    describe('Web storage Service', function() {

        
        var webStorageService;
        var applicationKey = "wss";
        beforeEach(function (done) {
            var injector = new Squire();
            sessionStorage.clear();
            localStorage.clear();

            injector
                .require([
                    "services/rest/common/webStorageService",
                    "backbone"
                ], function (module) {
                    webStorageService = new module(applicationKey);
                    done();
                });
        });


        it('should create a web Storage Service instance.', function() {
            expect(webStorageService).to.exist;
            expect(webStorageService).to.be.instanceof(Backbone.Model);
        });

        it('should create session storage with corresponding key', function() {
            webStorageService.setSessionStorage({});
            expect(sessionStorage.getItem(applicationKey)).to.exist;
        });

        it('should create session storage and save object', function() {
            webStorageService.setSessionStorage({
                test: "test"
            });
            var obj = JSON.parse(sessionStorage.getItem(applicationKey));
            expect(obj.test).to.exist;
            expect(obj.test).to.equal("test");
        });

        it('should get session storage by key', function() {
            webStorageService.setSessionStorage({
                test: "test"
            });
            expect(webStorageService.getSessionStorage("test")).to.exist;
            expect(webStorageService.getSessionStorage("test")).to.equal("test");
        });

        it('should get all session storage', function() {
            webStorageService.setSessionStorage({
                test: "test",
                secondTest: "secondTest"
            });
            var obj = webStorageService.getSessionStorage();
            expect(obj).to.exist;
            expect(obj.test).to.equal("test");
            expect(obj.secondTest).to.equal("secondTest");
        });

        it('should delete session storage by key', function() {
            webStorageService.setSessionStorage({
                test: "test",
                secondTest: "secondTest"
            });
            webStorageService.deleteSessionStorageKey("secondTest");
            expect(webStorageService.getSessionStorage("test")).to.exist;
            expect(webStorageService.getSessionStorage("test")).to.equal("test");
            expect(webStorageService.getSessionStorage("secondTest")).to.not.exist;
        });

        it('should destroy session storage', function() {
            webStorageService.setSessionStorage({
                test: "test",
                secondTest: "secondTest"
            });
            webStorageService.destroySessionStorage();
            expect(webStorageService.getSessionStorage("test")).to.not.exist;
            expect(webStorageService.getSessionStorage("secondTest")).to.not.exist;
        });

        it('should create local storage with corresponding key', function() {
            webStorageService.setLocalStorage({});
            expect(localStorage.getItem(applicationKey)).to.exist;
        });

        it('should create local storage and save object', function() {
            webStorageService.setLocalStorage({
                test: "test"
            });
            var obj = JSON.parse(localStorage.getItem(applicationKey));
            expect(obj.test).to.exist;
            expect(obj.test).to.equal("test");
        });

        it('should get local storage by key', function() {
            webStorageService.setLocalStorage({
                test: "test"
            });
            expect(webStorageService.getLocalStorage("test")).to.exist;
            expect(webStorageService.getLocalStorage("test")).to.equal("test");
        });

        it('should get all local storage', function() {
            webStorageService.setLocalStorage({
                test: "test",
                secondTest: "secondTest"
            });
            var obj = webStorageService.getLocalStorage();
            expect(obj).to.exist;
            expect(obj.test).to.equal("test");
            expect(obj.secondTest).to.equal("secondTest");
        });

        it('should delete local storage by key', function() {
            webStorageService.setLocalStorage({
                test: "test",
                secondTest: "secondTest"
            });
            webStorageService.deleteLocalStorageKey("secondTest");
            expect(webStorageService.getLocalStorage("test")).to.exist;
            expect(webStorageService.getLocalStorage("test")).to.equal("test");
            expect(webStorageService.getLocalStorage("secondTest")).to.not.exist;
        });

        it('should destroy local storage', function() {
            webStorageService.setLocalStorage({
                test: "test",
                secondTest: "secondTest"
            });
            webStorageService.destroyLocalStorage();
            expect(webStorageService.getLocalStorage("test")).to.not.exist;
            expect(webStorageService.getLocalStorage("secondTest")).to.not.exist;
        });

    });
});
