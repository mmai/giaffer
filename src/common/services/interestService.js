'use strict';

angular.module('ngGiaffer.interestServiceModule', [])

.provider('$interests', function() {
        var Interests = null;
        var defaults;

        this.setDefaults = function(def){
            if (def) {
                defaults = def;
            } 
        };

        this.$get = function(florm, rootScope) { // injectables go here
            //florm initialisation with defaults (not possible in setDefaults
            //due to angular inability to inject services in configuration blocs)
            if (Interests === null){
                Interests = florm('interests');

                if (Interests.all().length === 0){
                    for (var i=0, len=defaults.interests.length;i<len;i++){
                        Interests.new(defaults.interests[i]).save();
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
                    rootScope.$broadcast('interests:add', {name: name, searchString: searchString});
                    return interest;
                },
                delete: function(id){
                    return Interests.delete(id);
                },
                find: function(filters){
                    return Interests.find(filters);
                }
            };
            return service;
        };
        this.$get['$inject'] = ['$florm', '$rootScope'];
    });
