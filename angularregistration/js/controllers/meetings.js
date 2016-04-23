myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){
    
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    
    auth.$onAuth(function(authUser){
        if(authUser){
        var meetingsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');
            
        var meetingInfo = $firebaseArray(meetingsRef);
        $scope.meetings = meetingInfo;
            
        meetingInfo.$loaded().then(function(data){
           $rootScope.howManyMeetings = meetingInfo.length;
        }); // make sure meeting data is loaded
            
        meetingInfo.$watch(function(data){
           $rootScope.howManyMeetings = meetingInfo.length;
        }); // make sure meeting data is loaded
            
        $scope.addMeeting = function(){
            meetingInfo.$add({
                name: $scope.meetingname,
                date: Firebase.ServerValue.TIMESTAMP
            }).then(function(){
                $scope.meetingname='';
            }); //promise
        }; // addMeeting
            
            
        $scope.deleteMeeting = function(key){
            meetingInfo.$remove(key);
        }
        
        }// User Authenticated
    });// on Auth

}]);// Controller