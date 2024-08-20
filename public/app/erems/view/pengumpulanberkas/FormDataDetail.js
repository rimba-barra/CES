Ext.define('Erems.view.pengumpulanberkas.FormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.pengumpulanberkasformdatadetail',
    requires: [
		'Erems.library.template.component.Berkascombobox',
		'Erems.library.template.component.Statusberkascombobox'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
//    height: 600,
    width: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'berkas_id',
                    name: 'berkas_surat_detail_id'
                },
                {
                    xtype: 'berkascombobox',
                    itemId: 'fs_berkas_id',
                    name: 'berkas_id',
                    anchor:'-15',
                    enableKeyEvents: true,

                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_code',
                    name: 'code',
                    anchor:'-15',
                    hidden:true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_berkas',
                    name: 'berkas',
                    anchor:'-15',
                    hidden:true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_description',
                    name: 'description',
                    anchor:'-15',
                    hidden:true
                },
                {
                    xtype: 'statusberkascombobox',
                    itemId: 'fs_status_berkas',
                    name: 'status_id',
                    anchor:'-15',
                    enableKeyEvents: true,

                },
				
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    
});

