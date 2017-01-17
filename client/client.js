/**
* Templates
*/



import { Accounts } from 'meteor/accounts-base';
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});

function clearMessages(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

if (Meteor.isClient) {
    Template.messages.helpers({
        messages: function() {
            return Messages.find({}, { sort: { time: -1}});
        }
    });

    Template.input.events = {
        'keydown input#message' : function (event) {
            if (event.which == 13) { // 13 is the enter key event
                var name = 'Anonymous';
                var message = document.getElementById('message');
                if (message.value != '') {
                    Messages.insert({
                        name: name,
                        message: message.value,
                        time: Date.now(),
                  });

                document.getElementById('message').value = '';
                message.value = '';
                }
            }
        }
    }
}
