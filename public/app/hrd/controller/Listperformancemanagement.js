Ext.define('Hrd.controller.Listperformancemanagement', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Listperformancemanagement',
    views: ['listperformancemanagement.Panel', 'listperformancemanagement.Grid', 'listperformancemanagement.FormSearch', 'listperformancemanagement.GridExport', 'listperformancemanagement.FormData'],
    requires: [
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.Util',
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox'
    ],
    formWidth: 500,
    refs: [
        {
            ref: 'grid',
            selector: 'listperformancemanagementgrid'
        },
        {
            ref: 'formsearch',
            selector: 'listperformancemanagementformsearch'
        },        
        {
            ref: 'gridexport',
            selector: 'listperformancemanagementexportgrid'
        },
        {
            ref: 'formdata',
            selector: 'listperformancemanagementformdata'
        },  
    ],
    controllerName: 'listperformancemanagement',
    fieldName: 'employee_id',
    bindPrefixName:'Listperformancemanagement',
    init: function(application) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        me.util     = new Hrd.library.box.tools.Util();
        me.tools    = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dr       = new Hrd.library.box.tools.Dynamicrequest();

        this.control({
            'listperformancemanagementpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender             
            },
            'listperformancemanagementgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'listperformancemanagementgrid button[action=updateStatus]': {
                click: me.openStatusForm,
            },
            'listperformancemanagementgrid button[action=deletePM]': {
                click: me.deletePM,
            },
            'listperformancemanagementgrid button[action=reloadPM]': {
                click: me.reloadPM,
            },
            'listperformancemanagementformsearch button[action=search]': {
                click: me.dataSearch,
                afterrender: this.formSearchAfterRender
            },
            'listperformancemanagementformsearch button[action=reset]': {
                click:function (){
                    this.dataReset(this);                     
                }   
            },
            'listperformancemanagementformsearch #fd_subholding': {
                change: this.getAllProject
            },

            'listperformancemanagementformsearch #fd_project': {
                change: this.getAllPT
            },

            'listperformancemanagementformsearch #fd_pt': {
                change: this.getCombobox
            },
            'listperformancemanagementformdata button[action=save]': {
                click: me.updateStatus
            },
        });
    },
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

        grid.down('#btnUpdateStatus').setDisabled(row.length < 1);
        grid.down('#btnDeletePM').setDisabled(row.length != 1);
    },
    gridAfterRender: function() {
        var me = this;
        me.dataReset();

        //biar pas load awal pagingnya ke reload jadi gk muncul 25 data saja
        me.getGrid().down("pagingtoolbar").getStore().reload();
    },
    dataSearch: function() {
        resetTimer();
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();

        me.getGrid().doInit();
        var store = me.getGrid().getStore();

        var data = {
            subholding_id       : fields['subholding_id'].join(),
            project_id          : fields['project_id'].join(),
            pt_id               : fields['pt_id'].join(),
            periode             : fields['periode'],
            department_id       : fields['department_id'].join(),
            employee_name       : fields['employee_name'],
            pmdocument_id       : fields['pmdocument_id'].join(),
            status_document     : fields['status_document'].join(),
            jenis_document      : fields['jenis_document'].join(),
            status_per_document : fields['status_per_document'].join(),
        };

        for (var x in data){
            store.getProxy().setExtraParam(x, data[x]);
        }

        me.loadPage(store);
    },
    refreshPagingToolbar: function() {
        var me = this;
        var g = me.getGrid();
        if (g) {
            var pt = me.getGrid().down("pagingtoolbar");
            if (pt) {
                pt.getStore().reload();
            }
        }
    },
    formSearchAfterRender: function(el) {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        var fs      = me.getFormsearch();    
        
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                var cb          = data['others'][0][0];
                var subholding  = me.setComboboxModel(cb.subholding, 'subholding');
                var document    = me.setComboboxModel(cb.document, 'document');
                var status      = me.setComboboxModel(cb.status, 'status');
                
                me.tools.wesea(subholding, fs.down("[name=subholding_id]")).comboBox();
                me.tools.wesea(document, fs.down("[name=jenis_document]")).comboBox();
                me.tools.wesea(status, fs.down("[name=status_document]")).comboBox();
                me.tools.wesea(status, fs.down("[name=status_per_document]")).comboBox();
            }
        }).read('getdefaultcombobox');        
    },
    getAllProject: function(el) {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        var fs      = me.getFormsearch();
        fs.down("[name=project_id]").setValue("");
        fs.down("[name=pt_id]").setValue("");
        me.tools.ajax({
            params: {
                'subholding_id':fs.getValues().subholding_id.join()
            },
            success: function (data, model) {
                var newData = [];
                for (var v in data) {
                    newData.push(data[v].project);
                }
                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['project_id', 'name'],
                    data: newData
                });
                fs.down("[name=project_id]").bindStore(newStore);                 
            }
        }).read('getAllProject');      
    },
    getAllPT: function(el) {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        var fs      = me.getFormsearch();
        fs.down("[name=pt_id]").setValue("");

        me.tools.ajax({
            params: {
                'subholding_id' : fs.getValues().subholding_id.join(),                
                'project_id'    : fs.getValues().project_id.join()
            },
            success: function (data, model) {
                var newData = [];   
                for (var v in data) {
                    newData.push(data[v].pt);
                }
                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['pt_id', 'name'],
                    data: newData
                });
                fs.down("[name=pt_id]").bindStore(newStore);
            }
        }).read('getAllPT');        
    },
    getCombobox: function(el){
        var me      = this;
        var fs      = me.getFormsearch();

        me.tools.ajax({
            params: {
                'project_id' : fs.getValues().project_id.join(),
                'pt_id'      : fs.getValues().pt_id.join()
            },
            success: function (data, model) {
                var cb          = data['others'][0][0];
                var department  = me.setComboboxModel(cb.department, 'department');
                var package     = me.setComboboxModel(cb.package, 'package');
                
                me.tools.wesea(department, fs.down("[name=department_id]")).comboBox();
                me.tools.wesea(package, fs.down("[name=pmdocument_id]")).comboBox();
            }
        }).read('getcombobox');    
    },
    setComboboxModel: function(data, name){
        var key    = data.length > 0 ? Object.keys(data[0]) : [];
        var model  = [];
        var record = [];

        Ext.each(data, function(value){
            record.push(value);
        });

        Ext.each(key, function(value){
            var temp = {};

            temp['mapping'] = name + '.' + value;
            temp['name'] = value;

            model.push(temp);
        });

        return { data:record, model:model };
    },
    openStatusForm: function(){
        var me = this;
        me.instantWindow("FormData", 400, "Form Data", "create", "formdatawindow");

        var f           = me.getFormdata();
        var grid        = me.getGrid().getSelectionModel().getSelection();
        var employee_id = [];
        var periode     = [];

        Ext.each(grid, function(value){
            if(!employee_id.includes(value.data.employee_id)) {
                employee_id.push(value.data.employee_id);
            }

            if(!periode.includes(value.data.employee_id)) {
                periode.push(value.data.periode);
            }
        });

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                var cb     = data['others'][0][0];
                var status = me.setComboboxModel(cb.status, 'status');
                
                me.tools.wesea(status, f.down("[name=updatestatus_id]")).comboBox();
                f.down("[name=employee_id]").setValue(employee_id.join("~"));
                f.down("[name=periode]").setValue(periode.join("~"));
            }
        }).read('getstatuscombobox');  
    },
    updateStatus: function(){
        var me          = this;
        var form        = me.getFormdata();
        var grid        = me.getGrid();
        var sp          = form.down('[name=updatestatus_id]').getValue();
        var employee_id = form.down('[name=employee_id]').getValue();
        var periode     = form.down('[name=periode]').getValue();

        if(sp != null){
            me.tools.ajax({
                params: { 
                    sp:sp,
                    employee_id:employee_id,
                    periode:periode,
                },
                success: function (data, model) {
                    Ext.Msg.show({
                        title: 'INFO',
                        msg: "Success Updated.",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function (clicked) {
                            form.up("window").close();

                            grid.down("pagingtoolbar").getStore().reload();
                        }
                    });
                }
            }).read('updatestatus'); 
        }
    },
    deletePM: function(){
        var me          = this;
        var grid        = me.getGrid().getSelectionModel().getSelection()[0];
        var employee_id = grid.data.employee_id;
        var periode     = grid.data.periode;

        Ext.Msg.confirm('Confirm', "Anda yakin ingin menghapus PM?", function (btn) {
            if(btn == 'yes'){
                me.tools.ajax({
                    params: { 
                        employee_id:employee_id,
                        periode:periode,
                    },
                    success: function (data, model) {
                        Ext.Msg.show({
                            title: 'INFO',
                            msg: "Success Deleted.",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function (clicked) {
                                form.up("window").close();

                                me.getGrid().down("pagingtoolbar").getStore().reload();
                            }
                        });
                    }
                }).read('deletepm'); 
            }
        });
    },
    reloadPM: function(){
        console.log("hunjyujny6uju6j");
    },
});