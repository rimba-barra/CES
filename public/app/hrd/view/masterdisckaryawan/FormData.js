Ext.define('Hrd.view.masterdisckaryawan.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.masterdisckaryawanformdata',
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
                    name: 'disckaryawan_id',
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    /*
                    {
                        xtype: 'textfield',
                        name: 'group_code',
                        labelWidth: 150,
                        fieldLabel: 'Group (Golongan) code',
                    }, 
                    */
                    {
                        xtype: 'groupcombobox',
                        fieldLabel: 'Group (Golongan) Code',
                        itemId: 'fd_group_code',
                        id: 'group_code',
                        name: 'group_code',
                        labelWidth: 150,
                        allowBlank: false,
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null,
                        queryMode:'local',
                        displayField: 'code',
                        valueField:'code'
                    },
                    {
                        xtype: 'displayfield',
                        value: '&nbsp;'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'numberfield',
                        name: 'min_masakerja',
                        labelWidth: 150,
                        fieldLabel: 'Minimum masa kerja',
                        allowBlank: false,
                    },
                    {
                        xtype: 'displayfield',
                        value: '&nbsp; tahun'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'numberfield',
                        labelWidth: 150,
                        name: 'persen_disc_pertahun',
                        fieldLabel: 'Persentase diskon',
                        allowBlank: false,
                    },
                    {
                        xtype: 'displayfield',
                        value: '&nbsp; / tahun'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'numberfield',
                        name: 'min_disc',
                        labelWidth: 150,
                        fieldLabel: 'Persentase diskon Min.',
                        allowBlank: false,
                        readOnly:true
                    },
                    {
                        xtype: 'displayfield',
                        value: '&nbsp; % (Minimum masa kerja * Persentase diskon per tahun)'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'numberfield',
                        name: 'max_disc',
                        labelWidth: 150,
                        fieldLabel: 'Persentase diskon Max.',
                        allowBlank: false,
                    },
                    {
                        xtype: 'displayfield',
                        value: '&nbsp; % '
                    }]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

});

