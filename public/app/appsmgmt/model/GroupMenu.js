Ext.define('Appsmgmt.model.GroupMenu',{extend:'Ext.data.Model',alias:'model.GroupMenuModel',idProperty:'group_menu_id',fields:[{name:'group_menu_id',type:'int'},{name:'group_id',type:'int'},{name:'menu_id',type:'int'},{name:'description',type:'string'},{name:'active',type:'boolean'},{name:'group_name',type:'string'},{name:'menu_name',type:'string'},{name:'menu_caption',type:'string'},{name:'menu_parent',type:'int'},{name:'menu_order',type:'int'},{name:'controller_id',type:'int'},{name:'widget',type:'string'},{name:'menu_icon',type:'string'},{name:'menu_icon_cls',type:'string'},{name:'menu_args',type:'string'},{name:'apps_id',type:'int'},{name:'description',type:'string'},{name:'active',type:'boolean'},{name:'menu_parent_name',type:'string'},{name:'controller_name',type:'string'},{name:'apps_name',type:'string'},{name:'menu_name_display',type:'string'}]});