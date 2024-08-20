/* 
 * Controllerwb
 * Controller that can show mini read grid that can be called from other panel
 * 
 */
Ext.define('Erems.library.template.controller.Controllerwb', {
    extend: 'Erems.library.template.controller.Controller2',
    // extend: 'Erems.library.template.controller.Controller',
    wrRequestFlag: false,
    init: function(application) {
        this.control({
        });
    },
    browseItem: function(callerId) {
        var me = this;
        me.wrRequestFlag = false;
        me.callerId = callerId;
        me.instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');

    },
    browseItemWR: function(callerId, request) {
        var me = this;
        me.wrRequestFlag = true;
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
	
	// added by Tirtha Brata September 18th, 2013
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
    },
	// end added by Tirtha Brata September 18th, 2013

});


