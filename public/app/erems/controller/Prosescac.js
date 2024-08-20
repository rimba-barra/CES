Ext.define('Erems.controller.Prosescac', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Prosescac',
    views: ['prosescac.Panel', 'prosescac.Grid', 'prosescac.FormSearch', 'prosescac.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'prosescacgrid'
        },
        {
            ref: 'formsearch',
            selector: 'prosescacformsearch'
        },
        {
            ref: 'formdata',
            selector: 'prosescacformdata'
        },
        {
            ref: 'formdataprocess',
            selector: 'prosescacformdataprocess'
        },
        {
            ref: 'griddetail',
            selector: 'prosescacgriddetail'
        },
        {
            ref: 'gridnomor',
            selector: 'prosescacgridnomor'
        }

    ],
    controllerName: 'prosescac',
    fieldName: 'cac_cac_name',
    bindPrefixName: 'Prosescac',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formWidth: 800,
    formxWinId: 'win-posisiwinId',
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
            'prosescacpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender

            },
            'prosescacgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'prosescacgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'prosescacgrid toolbar button[action=update]': {
                click: function() {
                    // this.formDataShow('update');
                }
            },
            'prosescacgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'prosescacgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'prosescacgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'prosescacformsearch button[action=search]': {
                click: this.dataSearch
            },
            'prosescacformsearch button[action=reset]': {
                click: this.dataReset
            },
            'prosescacformdata': {
                afterrender: this.formDataAfterRender,
                beforerender: function(el) {

                }
            },
            'prosescacformdata button[action=process]': {
                click: this.mainDataSave
            },
            'prosescacformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'prosescacgriddetail': {
                selectionchange: function() {
                    me.gridDetailSelectionChange();
                }
            },
        });
    },
    gridDetailSelectionChange: function() {
        var me = this;
        var gd = me.getGriddetail();
        var gn = me.getGridnomor();

        var rec = gd.getSelectedRecord();

        if (!rec) {
            console.log("Tidak ada process cac detail yang terpilih.");
            return;
        }
        
        console.log(rec);



        gn.getStore().load({
            params: {
                prosescacdetail_id: rec.get("prosescacdetail_id")
            },
            callback: function(rec, op) {
                gn.attachModel(op);
            }
        });
    },
    dataSearch: function() {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        for (var x in fields)
        {

            store.getProxy().setExtraParam(x, fields[x]);
        }
        //   store.getProxy().setExtraParam("smscategory_id", me.getFormsearch().down("[name=smscategory_id]").getValue());
        me.loadPage(store);

    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var f = me.getFormsearch();

        me.tools.ajax({
            params: {},
            success: function(data, model) {


                //  f.setLoading(false);
                me.tools.wesea(data.smscategory, f.down("[name=smscategory_id]")).comboBox();
                //  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

            }
        }).read('processinit');

    },
    fdar: function() {
        var me = this;
        return me.altFdar(me);

    },
    mainDataSave: function() {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Sedang memproses...");
        me.tools.ajax({
            params: {
                proses_date: f.down("[name=proses_date]").getValue(),
                periode_start: f.down("[name=periode_start]").getValue(),
                periode_end: f.down("[name=periode_end]").getValue()
            },
            success: function(data, model) {
                console.log(data);
                if (data.others[0][0]['HASIL']) {
                    f.up("window").close();
                    me.getGrid().getStore().loadPage(1);
                }else{
                    me.tools.alert.warning(data.others[0][0]['MSG']);
                }
                f.setLoading(false);


            }
        }).read('prosescac');

        //  me.tools.iNeedYou(me).save();
    },
    altFdar: function(controller) {
        var me = this;
        var f = controller.getFormdata();



        //
        var x = {
            init: function() {

                controller.setActiveForm(f);




            },
            create: function() {
                var that = this;
                f.editedRow = -1;



            },
            update: function() {
                var that = this;
                f.down("button[action=process]").hide();

                console.log(f.down("button[action=process]"));

                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (!rec) {
                    me.tools.alert.warning("Tidak ada record terpilih.");
                    return;
                }

               //console.log(rec);
                f.down("[name=proses_date]").hide();
                f.down("[name=periode_start]").hide();
                f.down("[name=periode_end]").hide();

                var gd = me.getGriddetail();
                gd.doInit();
                var gn = me.getGridnomor();
                gn.doInit();

                gd.getStore().load({
                    params: {
                        prosescac_id: rec.get("prosescac_id")
                    },
                    callback: function(rec, op) {
                        gd.attachModel(op);
                    }
                });




                //  f.editedRow = controller.getGrid().getSelectedRow();

            }

        };
        return x;
    }




});