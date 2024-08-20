Ext.define('Hrd.minic.lookup.Employee', {
    extend: 'Hrd.library.box.tools.Minic',
    requires:['Hrd.library.box.tools.ComboLoader'],
    formAlias: '',
    refs: [
        {
            ref: 'legrid', // lookupemployee grid
            selector: 'lookupemployeegrid'
        },
        {
            ref: 'lepanel',
            selector: 'lookupemployeepanel'
        },
        {
            ref: 'leformsearch',
            selector: 'lookupemployeeformsearch'
        }
    ],
    myRefs:{
        grid:'lookupemployeegrid',
        panel:'lookupemployeepanel',
        search:'lookupemployeeformsearch'
    },
    comboLoader:null,
    panelId:'currentId',
    getPanel: function() {
        return this.getController().getLepanel();
    },
    getGrid: function() {
        return this.getController().getLegrid();
    },
    getFormsearch:function(){
        return this.getController().getLeformsearch();
    },
    getControl: function() {
        var newEvs = {};
        var me = this;
        newEvs['#'+me.panelId] = {
            afterrender: function(el) {
                me.panelAfterRender(el);
            }
        };

        newEvs['#'+me.panelId+' lookupemployeegrid'] = {
            afterrender: function(el) {
                me.gridAfterRender(el);
            },
            itemdblclick: this.gridItemDblClick
        };
        newEvs['#'+me.panelId+' lookupemployeegrid toolbar button[action=select]'] = {
            click: function() {
                me.selectOnClick();
            }

        };
        newEvs['#'+me.panelId+' lookupemployeeformsearch  button[action=search]'] = {
            click: function() {
                me.searchOnClick();
            }

        };
        newEvs['#'+me.panelId+' lookupemployeeformsearch button[action=reset]'] = {
            click: function() {
                me.resetOnClick();
            }

        };


        return newEvs;
    },
    searchOnClick:function(){
        var me = this;
        var s = me.getGrid().getStore();
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            s.getProxy().setExtraParam(x, fields[x]);
        }
        s.loadPage(1);
        
    },
    resetOnClick:function(){
        var me = this;
        me.getFormsearch().getForm().reset(true);
        me.searchOnClick();
    },
    selectOnClick: function() {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            me.getController().minicProc().lookupEmployee.selectOnClick(rec);
            me.getPanel().up("window").close();
        }
    },
    gridAfterRender: function(el) {
        var me = this;
  
        el.bindPrefixName = me.controllerName;

        el.doInit();
        
        el.getStore().load({
            params: {
                mode_read: 'employee'
            },
            callback: function(a, b) {
                el.attachModel(b);
                
            }
        });
        
    },
    gridItemDblClick: function() {

    },
    panelAfterRender: function(el) {
        var me = this;
        console.log(el.down(me.myRefs.search));
        me.comboLoader = new Hrd.library.box.tools.ComboLoader({
            formSearch:el.down(me.myRefs.search),
            mainPanel:el
        });
        me.comboLoader.run(me.controllerName);
    }
});