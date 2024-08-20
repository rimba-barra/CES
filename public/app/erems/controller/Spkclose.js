Ext.define('Erems.controller.Spkclose', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Spkclose',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    
    views: ['spkclose.Panel', 'spkclose.Grid', 'spkclose.FormSearch', 'spkclose.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'spkclosegrid'
        },
        {
            ref: 'formsearch',
            selector: 'spkcloseformsearch'
        },
        {
            ref: 'formdata',
            selector: 'spkcloseformdata'
        },
        {
            ref: 'formdatast',
            selector: 'spkcloseformdatast'
        }
    ],

    formWidth: 500,
    nomMaster: 'main_list',
    nomIdProperty: 'spk_id',
    SPKTYPUNIT: 2,
    controllerName: 'spkclose',
    fieldName: 'spk_no',
    bindPrefixName:'Spkclose',
    localStore: {
        detail: null,
        unit: null,
    },
    cbf: null,
    mt: null,
    tools: null,
    myConfig: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        
        var me = this;
         me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();
        this.control({
            'spkclosepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'spkclosegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'spkclosegrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'spkclosegrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'spkclosegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'spkclosegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'spkclosegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'spkcloseformsearch button[action=search]': {
                click: this.dataSearch
            },
            'spkcloseformsearch button[action=reset]': {
                click: this.dataReset
            },
            'spkcloseformdata': {
                afterrender: this.formDataAfterRender
            },
            'spkcloseformdata button[action=save]': {
                click: this.mainDataSave
                
            },
            'spkcloseformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'spkcloseformsearch': {
                afterrender: this.spkformsearchAfterRender
            },
            
            'spkclosegrid toolbar button[action=editst]': {
                click:function(){
                    me.editSt();
                }
            },
            'spkcloseformdatast button[action=save]': {
                click: function(){
                    me.saveSt();
                }
                
            },
            

        });
    },
    saveSt:function(){
        var me = this;
        var f = me.getFormdatast();
        f.setLoading("Saving...");
        me.tools.ajax({
            params: f.getValues(),
            success: function(data, model) {
                
                if(data.others[0][0]["HASIL"] > 0){
                    f.up("window").close();
                    me.tools.alert.info("Saved.");
                }else{
                    me.tools.alert.warning(data.others[0][0]["MSG"]);
                }
                me.getGrid().getStore().loadPage(1);
                f.setLoading(false);
            }
        }).read('savest');
    },
    editSt:function(){
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        if(rec){
            var w =  me.instantWindow('FormDataSt', 400, 'Edit Informasi Serah Terima',"update", 'myStWindow');
            var f= me.getFormdatast();
            f.down("[name=spk_id]").setValue(rec.get("spk_id"));
            // console.log(rec);
            f.loadRecord(rec);
        }
    },
    mainDataSave: function() {
        var me = this;
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
           // store: me.getGrid().getStore()),
            finalData: function(data) {
            
                data["detail"] = [];
                data["status_change_date"] = new Date(data["status_change_date"]);
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    
    fdar: function() {
        var me = this;
        me.setActiveForm(me.getFormdata());
        
        var x = {
            init: function() {
                
            },
            create: function() {
              
            },
            update: function() {
               var rec = me.getGrid().getSelectedRecord();
               var f= me.getFormdata();
               f.editedRow = me.getGrid().getSelectedRow();
                me.getActiveForm().loadRecord(rec);
      
                if(rec.get("status")==="OPEN"){
                    f.down("[name=status_change_date]").setValue(new Date());
                }
                
            }
        };
        return x;
    },
    spkformsearchAfterRender: function() {

        var me = this;
        var p = me.getFormsearch();
        p.setLoading("Please wait");

        me.tools.ajax({
            params: {},
            success: function(data, model) {
                console.log(data);
                console.log(model);
                me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('detail');
        // var me = this;

        // var z = function() {
        //     /*@ nama component*/
        //     var ar = [ 'spktype_id','contractor_id'];
        //     /*@model name*/
        //     var arx = [ 'spktype','contractor'];
        //     for (var x in ar) {
        //         var y = me.getFormsearch().down("[name='" + ar[x] + "']");

        //         y.createStore(me, arx[x]);
        //         y.getStore().load();
        //     }

        // }
        // /*jika model - model selesai dijalankan*/
        // if (this.acmoDone) {
        //     z();
        // } else { /* jika tidak maka kita daftarkan function kita ke dalam antrian acmoArrayFunc*/
        //     this.acmoArrayFuncs.push(z);
        // }
    },
    fillFormSearchComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.spktype, f.down("[name=spktype_id]")).comboBox(true);
        me.tools.wesea(data.contractor, f.down("[name=contractor_id]")).comboBox(true);
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
        row = grid.getSelectionModel().getSelection();
        
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnEditSerah').setDisabled(row.length != 1);
    },
});