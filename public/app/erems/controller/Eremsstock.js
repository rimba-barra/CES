Ext.define('Erems.controller.Eremsstock', {
    extend: 'Erems.library.template.controller.Controllerstimulsoft', //Controller2
    alias: 'controller.Eremsstock',
    requires: [
//        'Erems.library.ModuleTools',
//        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
//        'Erems.library.XyReport'
    ],
    
    views: ['eremsstock.Panel','eremsstock.Konten', 'eremsstock.FormSearch'],
    stores: ['Mastercluster'],
    models: ['Mastercluster'],
    refs: [
        {
            ref: 'konten',
            selector: 'eremsstockkonten'
        },

        {
            ref: 'panel',
            selector: 'eremsstockpanel'
        },
        {
            ref: 'formsearch',
            selector: 'eremsstockformsearch'
        }

    ],
    
    controllerName: 'eremsstock',
    fieldName: 'payment_id',
    formWidth: 800,

    dateNow: new Date(),

    auto_Load: null,

    myConfig: null,
    cbf: null,


    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },

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
        
        Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/fontawesome.js', function () {
        }, function () {
        });
        


        this.control({
            'eremsstockpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender,

            },
            'eremsstockkonten': {
                afterrender: this.kontenAfterRender,
//                itemdblclick: this.gridItemDblClick,
//                itemcontextmenu: this.gridItemContextMenu,
//                selectionchange: this.gridSelectionChange
            },
            'eremsstockformsearch ': {
                afterrender: this.formSearchAfterRender
            },
            'eremsstockformsearch button[action=search]': {
                click: this.dataSearch
            },
            'eremsstockformsearch button[action=reset]': {
                click: this.dataReset
            }

        });
    },
    
    panelAfterRender: function(configs) {
        var me = this;

        var p = me.getPanel();
        p.up("window").maximize();
    },
    
    formSearchAfterRender:function(el){
		var me = this;
		me.loadComboBoxStore(el); 
    },

    kontenAfterRender: function (el) {
//        this.callParent(arguments);
        var me = this;
        var params = {};
        var f = me.getFormsearch();
        var t = f.down("[name=cluster_id]");
//        console.log(t.getValue());
        
        var p = me.getPanel();
        $('.x-tool-close').click(function (event) {
            clearInterval(me.auto_Load);
        });

    },
    dataSearch: function () {
        var me = this;
        var params = {};
        var f = me.getFormsearch();
        var t = f.down("[name=cluster_id]").getValue();
        params = {cluster_id:t};
        
        me.loadIndex('index', params);
        me.autoLoadIndex();
 
    },
    
    autoLoadIndex: function () {
        
        
        var me = this;
        var params = {};
        var f = me.getFormsearch();
        var t = f.down("[name=cluster_id]").getValue();
        params = {cluster_id:t};
        
        $( document ).ready(function() {
            me.auto_Load = setInterval(load, 1000);
            function load() {
                me.loadIndex('index', params);
            }
        });
        
        
        
        
    }, 
    
    loadIndex: function (url,param){
        var me = this;
        ApliJs.loadingbar().show("Mengambil informasi table stock...");
//        console.log(param);
        $.ajax({
            method: "POST",
            url: "erems/eremsstock/"+url,
            data: param
        }).done(function (msg) {
            
//            console.log(msg);
            ApliJs.loadingbar().hide();

//            ApliJs.showPhp(me, "table_stock", msg, 'index');
            ApliJs.showPhp(me, "table_stock", msg, 'false', '.content_data','','replace');
        });
    },
    
    loadDetail: function (url,param){
        var me = this;
        ApliJs.loadingbar().show("Mengambil informasi detail...");
//        console.log(param);
        $.ajax({
            method: "POST",
            url: "erems/eremsstock/"+url,
            data: param
        }).done(function (msg) {
            
//            console.log(msg);
//            $('.kotak_modal_body').html(msg)
//            $('#modal-detail').modal({
//                    show: true
//                });
            ApliJs.showPhp(me, "table_stock_detail", msg, 'true', '#modal-detail', '#modal-detail','replace');
            ApliJs.loadingbar().hide();

        });
    },

    apliJsFunctable_stock: function (modalId) {
        var me = this;
        var x = {
            init: function () {
                
            },
            afterRender: function () {

                // ApliJs.reset();

                $(function () {

                        $('.x-region-collapsed-placeholder').css("z-index", 1);

                        ApliJs.form('#' + modalId + ' form').initEvent();


                        var action = $('#' + modalId).attr("abc-action");

                        if (action === "index") {
                            
                           
                        } else {
                           

                           
                        }



//                    });

                    $('.btn-detail').click(function (event) {
                        event.preventDefault();
                        var params = {};
                        clearInterval(me.auto_Load);
                        var id  = $(this).attr("unit-id");
                        params = {unit_id:id};
                        
                        me.loadDetail('detail', params);
                    });     
                    
                    $('.btn-close-detail').click(function () {
                        me.autoLoadIndex();
                        
                    }); 


                });



            }

        };

        return x;

    },

	


});