Ext.define('Cashier.controller.Masterfixedasset', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.masterfixedasset',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    views: [
        'masterfixedasset.Panel',
        'masterfixedasset.Grid',
        'masterfixedasset.FormSearch',
        'masterfixedasset.FormData',
    ],
    stores: [
        'Masterfixedasset',
        'Project',
        'Coacombo',
        'Pt'
    ],
    models: [
        'Masterfixedasset',
        'Project',
        'Coa',
        'Pt'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterfixedassetpanel'
        },
        {
            ref: 'grid',
            selector: 'masterfixedassetgrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterfixedassetformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterfixedassetformdata'
        }
    ],
    controllerName: 'masterfixedasset',
    fieldName: 'fixedasset_id',
    bindPrefixName: 'Masterfixedasset',
    formWidth: 500,
    win: null,
    winId: null,
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    init: function (application) {
        var me = this;
        this.control({
            'masterfixedassetpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
            },
            'masterfixedassetgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'masterfixedassetformsearch': {
                afterrender: function() {

                    var me = this;

                    me.loadProject(me.getFormsearch());
                }
            },
            'masterfixedassetformsearch [name=project_id]': {
                change: function() {

                    var me = this;

                    me.loadPtbyProject(me.getFormsearch());
                }
            },
            'masterfixedassetformdata [name=project_id]': {
                change: function() {

                    var me = this;

                    me.loadPtbyProject(me.getFormdata());
                    me.getFormdata().down("[name=pt_id]").setValue();
                }
            },
            'masterfixedassetformsearch [action=search]': {
                click: me.dataSearch
            },
            'mastercoagrid toolbar [action=destroy]': {
                click: me.dataDestroy
            },
            'masterfixedassetformsearch [action=reset]': {
                click: me.dataReset
            },
            'masterfixedassetformdata': {
                afterrender: function() {
                    
                    var me = this;
                    me.formDataAfterRender(me.getFormdata());
                    me.loadProject(me.getFormdata());
                    me.loadPtbyProject(me.getFormdata());
                    me.formDataAfterRenderCustome();
                },
                boxready: function() {
                    var me = this.getMe();

                    $("#fixedasset_id input[name='coa']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'masterfixedassetformdata [action=save]': {
                click: me.dataSave
            },
            'masterfixedassetformdata [name=coa] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=coa]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'masterfixedassetformdata [name=status]': {
                change: function () {
                    me.conditionStatus();
                }
            }
        });
    },
    autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa = '';
        me = this;
        var f = me.getFormdata();

        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagrid',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'coa', row.coa_id,row.coa);
                }

            }
        });
    },
    formSearchAfterRenderCustom: function() {
        var me, storeproject;
        me = this;

        var f = me.getFormsearch();

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));                       
                    }
                }
            }

        });   
    },
    loadPtbyProject: function(f){

        var me = this;
        projectid = f.down("[name=project_id]").getValue();
         
        if(projectid != null){
            projectid = f.down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }
 
        var f = f;
        storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));                      
                }        
            }
        });
    },
    loadProject: function(f) {

        var me = this;

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));                       
                    }
                }
            }
        });  
    },
    conditionStatus: function () {
        var me, status;
        me = this;

        status = me.getFormdata().down("[name=status]").getValue();
        if (status == "SOLD") {
            // Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(600);
            me.getFormdata().down("[name=sell_date]").setVisible(true);
        } else {
            me.getFormdata().down("[name=sell_date]").setVisible(false);
            
        }

    },
})