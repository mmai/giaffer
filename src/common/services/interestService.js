'use strict';

angular.module('ngGiaffer.interestServiceModule', ['ngFlorm'])

.provider('$interests', function() {
        var Interests = null;
        var defaultInterests = [];
        var populate = true;

        this.setDefaults = function(defaults, disablePopulate){
            if (defaults) {
                defaultInterests = defaults;
            }
            if (disablePopulate){
                populate = false;
            }
        };

        this.$get = ['$florm', '$rootScope', function($florm, $rootScope) {
            //florm initialisation with defaultInterests (not possible in setDefaults
            //due to angular inability to inject services in configuration blocs)
            if (Interests === null){
                Interests = $florm('interests');

                if (Interests.all().length === 0 && populate){
                    for (var i=0, len=defaultInterests.length;i<len;i++){
                        Interests.new(defaultInterests[i]).save();
                    }
                }
            }

            var service = {
                all: function(){
                    return Interests.all();
                },
                add: function(name, searchString) {
                    var interest = Interests.new({name:name, searchString: searchString});
                    interest.save();
                    $rootScope.$broadcast('interests:add', {name: name, searchString: searchString});
                    return interest;
                },
                delete: function(id){
                    $rootScope.$broadcast('interests:delete', {id: id});
                    return Interests.delete(id);
                },
                truncate: function(){
                    return Interests.truncate();
                },
                find: function(filters){
                    return Interests.find(filters);
                },
                isDefaults: function(){
                    return  interestsEquals(Interests.all(), defaultInterests);
                }
            };
            return service;
        }];

        //Utils functions
        function interestsEquals(a, b){
            if (a.length !== b.length) {
                return false;
            }

            a = arr2Obj(a, 'name', 'searchString');
            b = arr2Obj(b, 'name', 'searchString');

            var names = Object.keys(a);
            var name;
            for (var i = 0, len = names.length; i < len; i++){
                name = names[i];
                if (b[name] !== a[name]) {
                    return false;
                }
            }

            return true;
        }

        function arr2Obj(arr, key, val){
            var obj = {};
            for (var i=0, len=arr.length;i<len;i++){
                obj[arr[i][key]] = arr[i][val];
            }
            return obj;
        }
    });

