//Ext.define('Appsmgmt.model.Application',{extend:'Ext.data.Model',alias:'model.ApplicationModel',idProperty:'apps_id',fields:[{name:'apps_id',type:'int'},{name:'apps_name',type:'string'},{name:'apps_basename',type:'string'},{name:'projectpt',type:'boolean'},{name:'projectpt_menu',type:'boolean'},{name:'description',type:'string'},{name:'active',type:'boolean'}]});

Ext.define('Appsmgmt.model.Application', {
    extend: 'Ext.data.Model',
    alias: 'model.ApplicationModel',
    idProperty: 'apps_id',
    fields: [{
        name: 'apps_id',
        type: 'int'
    }, {
        name: 'apps_name',
        type: 'string'
    }, {
        name: 'apps_basename',
        type: 'string'
    }, {
        name: 'projectpt',
        type: 'boolean'
    }, {
        name: 'projectpt_menu',
        type: 'boolean'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'active',
        type: 'boolean'
    }, {
        name: 'url_address',
        type: 'string'
    }]
});