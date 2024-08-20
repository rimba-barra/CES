Ext.define('Erems.controller.Popupchgnamesatubulan', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Popupchgnamesatubulan',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['popupchgnamesatubulan.Panel', 'popupchgnamesatubulan.Grid', 'popupchgnamesatubulan.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupchgnamesatubulangrid'
        },

        {
            ref: 'panel',
            selector: 'popupchgnamesatubulanpanel'
        },
        {
            ref: 'formsearch',
            selector: 'popupchgnamesatubulanformsearch'
        }

    ],
    controllerName: 'popupchgnamesatubulan',
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
    bindPrefixName: 'Popupchgnamesatubulan',
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
        var events = new Erems.library.box.tools.EventSelector();

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
            'popupchgnamesatubulanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupchgnamesatubulangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            
            'popupchgnamesatubulanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupchgnamesatubulanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupchgnamesatubulangrid toolbar button[action=export_excel]': {
                click: function(el) {
                    me.showExcel();
                }
            }
        });
    },
    
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    showFormdata: function (action) {
        var me = this;


    },
    showExcel:function(){
        var me = this;
        var p = me.getPanel();
        var params = me.getFormsearch().getValues();
      
        params["page"] = me.getGrid().getStore().currentPage;

        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
            }
        }).read('export');
    },
});
