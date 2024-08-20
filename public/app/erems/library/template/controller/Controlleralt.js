Ext.define('Erems.library.template.controller.Controlleralt', {
    extend     : 'Erems.library.template.controller.Controller',
    execAction : function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
            case me.bindPrefixName + 'Create':
            case me.bindPrefixName + 'Update':
			case me.bindPrefixName + 'Read':
			
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Print':
                loadReport(el, 'tms/building/print');
                break;
        }
    },
	
    getFormProperties: function(el, act, action) {
        var me = this;
        var p = {
            state     : 'read',
            formtitle : 'View',
            formicon  : 'icon-form'
        };

        if(typeof action === 'undefined'){
            // if(typeof el !== 'undefined' && el === 'update'){
            if(typeof el !== 'undefined'){
                action = el;
            }
        }

        if (typeof action !== 'undefined') {
            p.state = action.replace(me.bindPrefixName, "").toLowerCase();

            var grid           = me.getGrid();
            var actionColItems = grid.down('actioncolumn').items;
            var founded        = false;
            for (var i in actionColItems) {
                if (actionColItems[i].bindAction === action) {
                    p.formtitle = actionColItems[i].text;
                    p.formicon = actionColItems[i].iconCls;
                    founded = true;
                }
            }
            if (!founded) {
                p.formtitle = p.state;
            }
        }

        return p;
    },
    /*@override formDataShow 5 Dec 2013*/
    formDataShow: function(el, act, action) {
        console.log('Formdata ALT')
        var me = this;
        var file = document.URL + 'app/erems/view/' + me.controllerName + '/FormData.js';

        if(me.checkFileExist(file)){
            var state, formtitle, formicon;

             // var state = '';
             // if(action == undefined){
             //    state = el;
             // }
             // else{
             //     if(action == me.bindPrefixName + 'Create'){
             //        state = 'create';
             //     }
             //     else if(action == me.bindPrefixName + 'Update'){
             //        state = 'update';
             //     }
             //     else if(action == me.bindPrefixName + 'Read'){
             //        state = 'read';
             //     }
             // }
            
            var gfp = me.getFormProperties(el, act, action);
            
            state     = gfp.state;
            formtitle = gfp.formtitle;
            formicon  = gfp.formicon;

            switch (state) {
                case 'create':
                    formtitle = 'Add New';
                    formicon = 'icon-form-add';
                    break;
                case 'update':
                    formtitle = 'Edit';
                    formicon = 'icon-form-edit';
                    break;
                case 'read':
                    formtitle = 'View';
                    formicon = 'icon-form';
                    break;
            }

            if(formtitle.indexOf('_') > 0){
                formtitle = formtitle.replace(/_/gi, " ");
            }
            formtitle = me.sentenceCase(formtitle);


            var winId = 'win-holidayformdata';
            var win = desktop.getWindow(winId);
            if (!win) {
                win = desktop.createWindow({
                    id: winId,
                    title: formtitle,
                    iconCls: formicon,
                    resizable: false,
                    minimizable: false,
                    maximizable: false,
                    width: me.formWidth,
                    // height:Ext.getBody().getViewSize().height * 0.9,
                    //height:200,
                    renderTo: Ext.getBody(),
                    constrain: true,
                    constrainHeader: false,
                    modal: true,
                    layout: 'fit',
                    shadow: 'frame',
                    shadowOffset: 10,
                    border: false,
                    //items: Ext.create('Erems.view.' + me.controllerName + '.FormData'),
                    state: state,
                    listeners: {
                        boxready: function() {
                            // win.setHeight(200);

                            win.body.mask('Loading...');
                            var tm = setTimeout(function() {
                                win.add(Ext.create('Erems.view.' + me.controllerName + '.FormData'));
                                win.center();
                                win.body.unmask();

                                if(!me.searchContains(state, ['create', 'update']) && win.down('#btnCancel') != null){
                                    var btnItem = win.down('#btnCancel').up('toolbar[dock="bottom"]').items.items;
                                    btnItem.forEach(function(x){
                                        var itm = x.itemId;
                                        if(itm != undefined && itm.includes('btnSave')){
                                            x.hide();
                                        }
                                    });
                                }

                                clearTimeout(tm);
                            }, 1000);

                        }
                    }

                });
            }
            win.show();
        }
    },
	
	//added 25 september 2014
	browseItem: function(callerId) { 
        var me = this;
        me.wrRequestFlag = false;
        me.callerId = callerId;
        me.instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');

    },
	browsepanelBeforeRender: function(el, a, b) {
        var me = this;

        var gridView = Ext.create('Erems.view.' + me.controllerName + '.browse.Grid', {
            region: 'center'
        });
        var searchView = Ext.create('Erems.view.' + me.controllerName + '.browse.FormSearch', {
            region: 'west',
            split: true,
            maxWidth: 500,
            minWidth: 300,
            width: 300,
            collapsed: true,
            collapsible: true,
            iconCls: 'icon-search',
            title: 'Search'
        });
        el.removeAll();
        el.add(gridView);
        el.add(searchView);

        var items = el.items.items[1].items.items;
        var textfield = Ext.ComponentQuery.query('[xtype=textfield]', items);

        for (var i=0;i<textfield.length;i++) {
            textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.browsedataSearch(e);
                }
            });
        }
    },
	
	browsegridSelection: function(el) {
        var me = this;
        var unitGrid = el.up('grid');
        var unitStore = el.up('grid').getStore();
        var rows = unitGrid.getSelectionModel().getSelection();
        if (rows.length == 1) {
            el.up('window').destroy();
            _Apps.getController(me.callerId).processRowFromItemSelection(rows, me.controllerName);
        } else {
            Ext.Msg.alert('Info', 'Require 1 unit!');
            return;

        }
    },
	
	browsegridAfterRender: function(el, a, b) {
		var me = this;
		
		// added by Tirtha Brata September 18th, 2013
		me.browsedataReset(el.up('panel').up('panel').down('button[action=search]'));
		// end added by Tirtha Brata September 18th, 2013
		
        if (me.wrRequestFlag) {
            _Apps.getController(me.callerId).specialRequest(el.getStore());
            
        } else {
            resetTimer();
            var store = el.getStore();
            store.loadPage(1);
        }
    },
	
	browsedataSearch: function(el) {
        resetTimer();
        var me = this;
       
		var form = el.up('form');
		var store = el.up('panel').up('panel').down('grid').getStore();
	
       	var fields = form.getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.loadPage(1);
    },
    browsedataReset: function(el) {
        var me = this;
		var form = el.up('form');
        form.getForm().reset();
        me.browsedataSearch(el.up('panel').up('panel').down('button[action=search]'));
    }
	//end added 25 september 2014
	
})
