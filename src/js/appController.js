define( require => {

  require('ojs/ojknockout');
  require('ojs/ojlistview');
  require('ojs/ojcollectiontabledatasource');
  require('ojs/ojbutton');
  require('ojs/ojpopup');
  require('ojs/ojinputtext');
  require('ojs/ojlabel');

  const oj = require('ojs/ojcore');
  const ko = require('knockout');

  const TaskCollection = require('./taskModel');
  const taskCol = new TaskCollection();

  function ControllerViewModel() {

    this.dataSource = new oj.CollectionTableDataSource(taskCol);
    this.taskName = ko.observable('');

    this.openModal = function() {
      document.getElementById('taskPopup').open();
    }

    this.createTask = function() {
      taskCol.create({name : this.taskName(), completed : false}, { wait: true});
      this.taskName('');
      document.getElementById('taskPopup').close();
    }.bind(this)
    
    this.completeTask = function(id) {
      const taskModel = taskCol.get(id);
      taskModel.save({ completed : true });
    }
    
    this.deleteTask = function(id) {
      const taskModel = taskCol.get(id);
      taskCol.remove(taskModel);
      taskModel.destroy();
    }
  }

  return new ControllerViewModel();
});


