Ext.define('Erems.controller.Prosessp', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Prosessp',
    requires: ['Erems.library.ModuleTools','Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector', 'Erems.library.XyReport'],
    views: ['prosessp.Panel', 'prosessp.Grid', 'prosessp.FormSearch', 'prosessp.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'prosesspgrid'
        },
        {
            ref: 'formsearch',
            selector: 'prosesspformsearch'
        },
        {
            ref: 'formdata',
            selector: 'prosesspformdata'
        },
        {
            ref: 'formdataproses',
            selector: 'prosesspprosesformdata'
        },
        {
            ref: 'panel',
            selector: 'prosessppanel'
        },
    ],
    controllerName: 'prosessp',
    fieldName: 'payment_id',
    formWidth: 800,
    fillForm: null,
    unitFormula: null,
    paymentFunc: null,
    browseHandler: null,
    storeProcess: 'Prosesspdetail',
    stData: {},
    bindPrefixName: 'Prosessp',
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    tagihanDefaultValue: false,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    stList: null, // list of schedule type
    effectedSch: [], // list schedule id yang dibayar
    formxWinId: 'win-instalpaymentwinId',
    paymentId: 0,
    myParams: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    xyReport: null,
    printOutData: null,
    globalParams: null,
    init: function(application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'prosessppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'prosesspgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'prosesspgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'prosesspgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'prosesspgrid toolbar button[action=proses]': {
                click: function() {
                    me.showFormProses();
                }
            },
            'prosesspgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'prosesspgrid toolbar button[action=print]': {
                click: this.mainPrint
            },
            'prosesspgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'prosesspformsearch button[action=search]': {
                click: this.dataSearch
            },
            'prosesspformsearch button[action=reset]': {
                click: this.dataReset
            },
            'prosesspformdata': {
                afterrender: this.formDataAfterRender
            },
            'prosesspformdata button[action=save]': {
                click: this.mainDataSave
            },
            'prosesspformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'prosesspprosesformdata button[action=proses]': {
                click:function(){
                    me.prosesOnClick();
                }
            },
          


        });
    },
    prosesOnClick:function(){
       var me = this;
       var f = me.getFormdataproses();
       f.setLoading("Sedang memproses...");
       me.tools.ajax({
            params: f.getValues(),
            success: function(data, model) {
                if(data.others[0][0]['HASIL']){
                    me.getGrid().getStore().loadPage(1);
                    me.tools.alert.info("Sukses!");
                    f.up("window").close();
                }else{
                     me.tools.alert.warning(data.others[0][0]['MSG']);
                }
           
                
                f.setLoading(false);
            }
        }).read('proses');
    },
   showFormProses:function(){
      var me = this;
      me.instantWindow('FormDataProses',550, 'Proses','proses', 'myProsesWindow');
   },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        /*
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                // global params
                me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];

                me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('searchassets');
        */

    },
    fillFormSearchComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
        me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_id]")).comboBox(true);
        me.tools.wesea(data.block, f.down("[name=block_id]")).comboBox(true);
    },
    mainDataSave: function() {
        var me = this;
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store: me.localStore.detail,
            finalData: function(data) {
                data["purchaseletter_purchaseletter_id"] = data["purchaseletter_id"];
                data["payment"] = accounting.unformat(data["payment"]);
                data["admin_fee"] = accounting.unformat(data["admin_fee"]);
                data["detail"] = me.tools.gridHelper(me.getTagihangrid()).getJson();
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
        var f = me.getFormdata();

        me.mt = new Erems.library.ModuleTools();
        //
        var x = {
            init: function() {
                me.setActiveForm(f);
                

            },
            create: function() {
                

            },
            update: function() {



            }
        };
        return x;
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();

    },
   

});