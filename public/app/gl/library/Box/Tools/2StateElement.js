Ext.define('Gl.library.box.tools.2StateElement', {
    extend: 'Ext.container.Container',
    alias: 'widget.2stateelement',
    foundEl: null,
    notFoundEl: null,
    border: 5,
    style: {
        borderColor: '#B5B8C8',
        borderStyle: 'solid'
    },
    padding: '5px',
    afterRender: function(el, eOpts) {
        var me = this;
        me.callParent(arguments);
        /// add notFoundEl
        var newEl = null;
        if (typeof me.notFoundEl === 'string') {
            newEl = {
                xtype: 'label',
                text: me.notFoundEl
            };
        }


        if (newEl) {
            me.add([newEl]);
        }
        /// do ajax if foundEl exist
        if (me.foundEl) {
            var newEl2 = Ext.create('widget.'+me.foundEl, {});
            me.add([newEl2]);
            me.down(me.foundEl).hide();
            me.ajaxLoad();
        }

    },
    ajaxLoad: function() {

    }

});

