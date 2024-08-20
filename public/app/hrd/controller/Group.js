/*
 Ext.define('Hrd.controller.Group', {
 extend: 'Hrd.template.ControllerForMaster',
 alias: 'controller.Group',
 controllerName: 'group',
 fieldName: 'name',
 bindPrefixName: 'Group'
 });
 */

//edited by ahmad riadi 26-07-2017 
Ext.define('Hrd.controller.Group', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Group',
    controllerName: 'group',
    fieldName: 'group',
    bindPrefixName: 'Group',
    formWidth: 700,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    dynamicrequest: null,
    refs: [
        {
            ref: 'gridbrowse',
            selector: 'groupgridbrowse'
        },
        {
            ref: 'formbrowse',
            selector: 'groupformbrowse'
        },
    ],
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();
        var newEvs = {};
        newEvs["groupgrid toolbar button[action=" +me.bindPrefixName + "import]"] = {
            click: function () {
                me.parambrowse.stateform = 'read';
                me.dynamicrequest.GenerateFormdata(me.parambrowse);
            },
        };

	/*
        newEvs['groupgrid toolbar button[action=create]'] = {
            click: function () {
               if(apps.project !==1 && apps.pt !==1){
                    me.getGrid().down("button[action=create]").disable(true);
                    me.dynamicrequest.buildWarningAlert("Create data is not permit..");
               }else{
                   me.getGrid().down("button[action=create]").disable(false);
               }
            },
        };
	*/

        newEvs['groupformbrowse'] = {
            boxready: function () {
                me.formBrowseReady();
            },
        };
        newEvs['groupformbrowse'] = {
            boxready: function () {
                me.formBrowseReady();
            },
        };
        newEvs['groupformbrowse button[action=process]'] = {
            click: function () {
                me.Processdata();
            },
        };
        this.control(newEvs);
    },
    parambrowse: {
        //start formgeneate
        fromlocation: 'Hrd.view.group.FormBrowse',
        formtitle: 'Form Browse Data Group', formicon: 'icon-form-add',
        formid: 'win-groupgridbrowse', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
    },
    formBrowseReady: function () {
        var me, grid, store;
        me = this;
        grid = me.getGridbrowse();
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getgroupkantorpusat',
                project_id: 1,
                pt_id: 1,
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'index_no', direction: 'ASC'});
            }
        });
    },
    Processdata: function () {
        var me, grid, store, counter, rows, recordcounttext, record, rowdata, datasave,form;
        me = this;
        grid = me.getGridbrowse();
        form = me.getFormbrowse();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            form.up('window').body.mask('Saving, please wait ...');
            rows = grid.getSelectionModel().getSelection();
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            datasave = [];
            for (var i = 0; i < rows.length; i++) {
                record = rows[i];
                rowdata = record.raw.group;
                delete rowdata["project_id"];
                delete rowdata["pt_id"];
                delete rowdata["group_id"];
                delete rowdata["lambat"];
                delete rowdata["uang_makan_extra"];
                delete rowdata["uang_transport"];
                datasave[i] = rowdata;
            }
            me.tools.ajax({
                params: {"data": Ext.JSON.encode(datasave)},
                success: function (data, model) {
                    
                }
            }).read('createfromimport');            
            form.up('window').body.unmask();
            me.dynamicrequest.formClose(form);
            me.getGrid().getStore().reload();
        } else {
            me.dynamicrequest.buildWarningAlert("Process failed,no data in this grid");
        }


    }
});