Ext.define('Erems.controller.Spkcancel', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Spkcancel',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    views: ['spkcancel.Panel', 'spkcancel.Grid', 'spkcancel.FormSearch', 'spkcancel.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'spkcancelgrid'
        },
        {
            ref: 'formsearch',
            selector: 'spkcancelformsearch'
        },
        {
            ref: 'formdata',
            selector: 'spkcancelformdata'
        }
    ],

    formWidth: 500,
    nomMaster: 'main_list',
    nomIdProperty: 'spk_id',
    SPKTYPUNIT: 0,
    controllerName: 'spkcancel',
    fieldName: 'spk_no',
    bindPrefixName:'Spkcancel',
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
            'spkcancelpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'spkcancelgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'spkcancelgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'spkcancelgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'spkcancelgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'spkcancelgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'spkcancelgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'spkcancelformsearch': {
                afterrender: this.spkcancelformsearchAfterRender
            },
            'spkcancelformsearch button[action=search]': {
                click: this.dataSearch
            },
            'spkcancelformsearch button[action=reset]': {
                click: this.dataReset
            },
            'spkcancelformdata': {
                afterrender: this.formDataAfterRender
            },
            'spkcancelformdata button[action=save]': {
                click: this.mainDataSave
                
            },
            'spkcancelformdata button[action=cancel]': {
                click: this.formDataClose
            },
               


        });
    },
     panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;     
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                var fs = me.getFormsearch();
                me.tools.wesea(data.spktype, fs.down("[name=spktype_id]")).comboBox(true);
                me.tools.wesea(data.contractor, fs.down("[name=contractor_id]")).comboBox(true);
            }
        }).read('detail');
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
    spkcancelformsearchAfterRender: function() {

        var me = this;

        var z = function() {
            /*@ nama component*/
             var ar = [ 'spktype_id','contractor_id'];
            /*@model name*/
            var arx = [ 'spktype','contractor'];
            for (var x in ar) {
                var y = me.getFormsearch().down("[name='" + ar[x] + "']");

                y.createStore(me, arx[x]);
                y.getStore().load();
            }

        };
        /*jika model - model selesai dijalankan*/
        if (this.acmoDone) {
            z();
        } else { /* jika tidak maka kita daftarkan function kita ke dalam antrian acmoArrayFunc*/
            this.acmoArrayFuncs.push(z());
        }






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

        var z = function() {
            /*@ nama component*/
            var ar = [ 'spktype_id','contractor_id'];
            /*@model name*/
            var arx = [ 'spktype','contractor'];
            for (var x in ar) {
                var y = me.getFormsearch().down("[name='" + ar[x] + "']");

                y.createStore(me, arx[x]);
                y.getStore().load();
            }

        }
        /*jika model - model selesai dijalankan*/
        if (this.acmoDone) {
            z();
        } else { /* jika tidak maka kita daftarkan function kita ke dalam antrian acmoArrayFunc*/
            this.acmoArrayFuncs.push(z);
        }






    }
    



});