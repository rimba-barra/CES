Ext.define('Master.library.box.tools.EventSelector', {
    id: '',
    /*@params me = controller*/
    getEvents: function(me, controllerName) {
        var events = {};
        var panel = controllerName + 'panel';
        var grid = controllerName + 'grid';
        var formData = controllerName + 'formdata';
        var formSearch = controllerName + 'formsearch';
        events[panel] = {
            beforerender: me.mainPanelBeforeRender,
            afterrender: me.panelAfterRender
        };
        events[grid] = {
            afterrender: me.gridAfterRender,
            itemdblclick: me.newActionColumnClick,
            itemcontextmenu: me.gridItemContextMenu,
            selectionchange: me.gridSelectionChange
        };
        events[formSearch] = {
            afterrender: me.formSearchAfterRender
        };
        events[grid + ' toolbar button[action=create]'] = {
            click: function(el) {

                me.formDataShow(el, 'create', 'create');
            }
        };
        events[grid + ' toolbar button[action=update]'] = {
            click: function(el) {
                me.formDataShow(el, 'update', 'create');
            }
        };
        events[grid + ' toolbar button[action=destroy]'] = {
            click: me.dataDestroy
        };
        events[grid + ' toolbar button[action=print]'] = {
            click: me.dataPrint
        };
        events[grid + ' actioncolumn'] = {
            afterrender: me.gridActionColumnAfterRender,
            click: me.insActionColumnClick
        };
        events[formSearch + ' button[action=search]'] = {
            click: me.dataSearch
        };
        events[formSearch + ' button[action=reset]'] = {
            click: me.dataReset
        };
        events[formData] = {
            afterrender: me.formDataAfterRender
        };
        events[formData + ' button[action=save]'] = {
            click: me.mainDataSave
        };
        events[formData + ' button[action=cancel]'] = {
            click: me.formDataClose
        };

        return events;
    },
    rangedDateEvents:function(formAlias,objects){
        var events = {};
        events[formAlias+' datefield[name='+objects.from.name+']'] = {
            select:function(el){
             
               objects.from.select(el);
            }
        };
        events[formAlias+' datefield[name='+objects.to.name+']'] = {
            select:function(el){
                objects.to.select(el);
            }
        };
        return events;
    },
    timeInput:function(elAlias,objects){
        var events = {};
        events[elAlias+' textfield[name='+objects.name+']'] = {
            keyup:function(el){
                objects.keyup(el);
            },
            blur:function( el, the, eOpts ){
                if(typeof objects.blur ==='function'){
                   objects.blur(el, the, eOpts); 
                }
            }
        };
        return events;
    },
    comboBox:function(elAlias,objects){
        var events = {};
        events[elAlias+' textfield[name='+objects.name+']'] = {
            change:function(el){
                objects.change(el);
            }
        };
        return events;
    }

});




