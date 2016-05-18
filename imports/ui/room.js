import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms.js';
import { Reservations } from '../api/reservations.js';

import './room.html';

Template.room.onCreated(function () {
//  this.subscribe('query');

});
//http://guide.meteor.com/data-loading.html#pagination
Template.room.events({
  'click .make'(event, template) {
    event.preventDefault();
    if ( Session.get(this._id) > 0) {
    var reservation = {
      title: this.title,
      owner: Meteor.userId(),
      user: Meteor.user().username,
      datestart: Session.get('StartDate'),
      dateend: Session.get('EndDate'),}
    console.log(reservation, this._id,Meteor.user())
    Meteor.call('reservations.insert', reservation, Meteor.user().emails[0].address);
  } else {alert("room at max capacity")}
  },
  'click .delete'() {
    Meteor.call('rooms.remove', this._id);
  },
});

Template.room.helpers({
  counter() {
    var id = this._id
    Meteor.call('rooms.grid', this, Session.get("EndDate"), Session.get("StartDate"), function (error, result) {
      //Template.instance().feckinHell.set(result.reservations.length)
      console.log("shitForReal", id, result)
      Session.set(id, result)
      //project or aggregat the array
      //results.reservations.length
    })
    return Session.get(id)
  },
    //Session variables from calendar are global
    //find array of availability
/*    var foo = Session.get("EndDate")
    var bull = Session.get("StartDate")
    // roomsId,
    var x = Rooms.find({'reservations.dateend': {$gte: bull}, 'reservations.datestart': {$lte: foo}}).count(); //number of peple u're sharing hotel with
    //template.feckinHell.set(this.amount - Rooms.find({'reservations.dateend': {$gte: Session.get("StartDate")}, 'reservations.datestart': {$lte: Session.get("StartDate")}}).count())
  //  this.counter.get(this.counter.set(this.amount - (y - x)));
    return Template.instance().feckinHell.get()
  }, */
/*
  recursive

    find < stardate session
*/
});
