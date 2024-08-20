Ext.define('Erems.controller.Hpptanah', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Hpptanah',
    requires: [
//        'Erems.library.ModuleTools',
//        'Erems.library.Browse',
//        'Erems.library.box.Config',
//        'Erems.library.box.tools.Tools',
//        'Erems.template.ComboBoxFields',
//        'Erems.library.box.tools.EventSelector',
//        'Erems.library.XyReport'
    ],
    views: ['hpptanah.Panel', 'hpptanah.Grid', 'hpptanah.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'hpptanahgrid'
        },

        {
            ref: 'panel',
            selector: 'hpptanahpanel'
        },
        {
            ref: 'formsearch',
            selector: 'hpptanahformsearch'
        }

    ],
    controllerName: 'hpptanah',
    fieldName: 'payment_id',
    formWidth: 800,
    fillForm: null,
    unitFormula: null,
    paymentFunc: null,
    browseHandler: null,
    dateNow: new Date(),
    flaggeneratevoucherno: 0,
    state: null,
    accept_date: null,
    pt_id: 0,
    stData: {},
    bindPrefixName: 'Hpptanah',
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

    constructor: function (configs) {
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
    globalParamsForm: null,
    selectedPurchaseletter: null,
    myParams: {
        paymentteks: null,
        global: null
    },
    init: function (application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

        if (typeof Mustache === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

                if (typeof ApliJs === "undefined") {
                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

                        console.log("[INFO] ApliJs loaded.");

                    }, function () {
                        // error load file
                    });
                }


            }, function () {
                //  me.tools.alert.warning("Error load Prolibs.js file.");
            });

        }

        if (typeof moment !== 'function') {


            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
            }, function () {
            });
        }

        this.control({
            'hpptanahpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'hpptanahgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },

            'hpptanahformsearch button[action=search]': {
                click: this.dataSearch
            },
            'hpptanahformsearch button[action=reset]': {
                click: this.dataReset
            },

        });
    },
    gridItemDblClick: function (el) {

    },
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        // this.callParent(arguments);
        var me = this;

        if(me.references.includes('formsearch')){
            var form = me.getFormsearch();
            me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);
            
            for (var i=0;i<me.textfield.length;i++) {
                Ext.applyIf(me.textfield[i], {enableKeyEvents: true});
                
                me.textfield[i].on('keypress', function(e, el){
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                });
            }
        }

        var fields = me.getFormsearch().getValues();


        me.getGrid().doInit();
        for (var x in fields)
        {
            me.getGrid().getStore().getProxy().setExtraParam(x, fields[x]);
        }
        me.getGrid().getStore().load({
            params: {},
            callback: function (rec, op) {
                me.getGrid().attachModel(op);

                var pg = me.getGrid().down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }

            }
        });

        me.getGrid().on('edit', function (editor, e) {
            
           // console.log(e.field+"---"+e.value);
            var params = {
                    "hpptanah_bangunanpermeter":e.record.data.hpptanah_bangunanpermeter,
                    "hpptanah_bunga":e.record.data.hpptanah_bunga,
                    "hpptanah_devcost":e.record.data.hpptanah_devcost,
                    "hpptanah_skalakota":e.record.data.hpptanah_skalakota,
                    "hpptanah_skalaeco":e.record.data.hpptanah_skalaeco,
                    "hpptanahtanah_mentah":e.record.data.hpptanahtanah_mentah,
                    "purchaseletter_id":e.record.data.purchaseletter_id
                };
                params[e.field]=e.value;
           e.record.commit();
            me.tools.ajax({
                params:params,
                success: function (data, model) {

                   // console.log(data);


                }
            }).read('updatedata');
            
        });



        // add loading Bar
        ApliJs.loadingbar().init();


    },
    showFormdata: function (action) {
        var me = this;


    },

});
