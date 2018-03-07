const serviceURL = 'http://localhost:3000/tasks';

define( require => {
    
    const oj = require('ojs/ojcore');
    require('ojs/ojmodel');
    
    const Task = oj.Model.extend({
        urlRoot : serviceURL,
        parse : res =>     ({ id : res['id'], name : res['name'], completed : res['completed'] }),
        parseSave : req => ({ id : req['id'], name : req['name'], completed : req['completed'] }),
        idAttribute : 'id'
    }); 
    
    const TaskCollection = oj.Collection.extend({
        url : serviceURL,
        model : new Task(),
        comparator : 'id'
    });

    return TaskCollection;
});