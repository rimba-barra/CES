Ext.define('Erems.view.masterdocumentunit.FormDataDocument', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.masterdocumentunitformdatadocument',
    requires      : ['Erems.library.template.component.AllPurchaselettercombobox'],
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    bodyBorder    : true,
    bodyPadding   : 10,
    editedRow     : -1,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype : 'hiddenfield',
                    name  : 'unit_unit_id'
                },
                {
                    xtype : 'hiddenfield',
                    name  : 'unitdocument_id'
                },
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fd_file_text',
                    name   : 'filename'
                },
                {
                    xtype        : 'combobox',
                    padding      : '0 0 10px 0',
                    labelStyle   : 'padding:0px',
                    name         : 'documenttype_documenttype_id',
                    displayField : 'documenttype',
                    valueField   : 'documenttype_id',
                    fieldLabel   : 'Type'
                },
                {
                    xtype      : 'filefield',
                    padding    : '0 0 10px 0',
                    labelStyle : 'padding:0px',
                    fieldLabel : 'File',
                    itemId     : 'fd_file',
                    name       : 'file_browse',
                },
                {
                    xtype      : 'allpurchaselettercombobox',
                    padding    : '0 0 10px 0',
                    labelStyle : 'padding:0px',
                    anchor     : '-5',
                },
                {
                    xtype      : 'xnotefieldEST',
                    name       : 'description',
                    fieldLabel : 'Description',
                    labelStyle : 'padding:0px',
                },
                {
                    xtype     : 'panel',
                    width     : 140,
                    height    : 170,
                    bodyStyle : 'background:none',
                    itemId    : 'file_image',
                    html      : ''
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    padding : 6,
                    type    : 'hbox'
                },
                items : [
                    {
                        xtype   : 'button',
                        action  : 'save',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-save',
                        text    : 'Save'
                    },
                    {
                        xtype   : 'button',
                        action  : 'cancel',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-cancel',
                        text    : 'Cancel',
                        handler : function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});