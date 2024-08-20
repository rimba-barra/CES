Ext.define('Hrd.view.masterdisctanahrumah.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.masterdisctanahrumahformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 250,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelWidth: 150,
                labelClsExtra: 'small',
                flex:'100%',
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'disctanah_rumah_id',
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        labelWidth: 150,
                        xtype: 'groupcodecombobox',
                        fieldLabel: 'Group (Golongan) code',
                        itemId: 'group_code',
                        id: 'group_code',
                        name: 'group_code',
                        emptyText: 'Please Select',
                        allowBlank: false,
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null,
                        absoluteReadOnly: true,
                        triggerAction: "all",
                        forceSelection : true,
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'numberfield',
                        name: 'max_luastanah',
                        labelWidth: 150,
                        fieldLabel: 'Max. Luas tanah',
                        allowBlank: false,
                    },
                    {
                        xtype: 'displayfield',
                        value: '&nbsp; / m2'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'numberfield',
                        labelWidth: 150,
                        name: 'max_luasbangunan',
                        fieldLabel: 'Max. Luas bangunan',
                        allowBlank: false,
                    },
                    {
                        xtype: 'displayfield',
                        value: '&nbsp; / m2'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'numberfield',
                        name: 'max_rupiah',
                        labelWidth: 150,
                        allowBlank: false,
                        fieldLabel: 'Max. Nominal Rp.'
                    }]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

});

