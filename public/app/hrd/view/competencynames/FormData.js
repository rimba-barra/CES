Ext.define('Hrd.view.competencynames.FormData', {
    alias           : 'widget.competencynamesformdata',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : [],
    frame           : true,
    autoScroll      : true,
    editedRow       : -1,
    deletedData     : {},
    labelWidth      : 250,
    initComponent   :  function() {
        var me  = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults    : {},
            items       : [{
                xtype       : 'hiddenfield',
                name        : 'competency_name_id',
            }, {
                xtype       : 'combobox',
                width       : 500,
                name        : 'competency_category_id',
                fieldLabel  : 'Competency Category',
                labelWidth  : 160,
                displayField: 'competency_category',
                valueField  : 'competency_category_id'              
            }, {
                xtype       : 'textfield',
                labelWidth  : 160,
                width       : 500,
                name        : 'code',
                fieldLabel  : 'Code'
            }, {
                xtype       : 'textfield',
                labelWidth  : 160,
                name        : 'competency_name',
                width       : 500,
                fieldLabel  : 'Competency Name'
            }, {
                xtype       : 'filefield',
                id          : 'file_upload',
                labelWidth  : 160,
                emptyText   : 'Select an image...',
                fieldLabel  : 'Image',
                name        : 'file_path',
                buttonText  : 'Browse',
                anchor      : '65%'
            }, {
                xtype       : 'hiddenfield',
                name        : 'image_path'
            }, {
                xtype       : 'button',
                text        : 'Show Image',
                action      : 'lihat_file'
            }, {
                xtype       : 'tabpanel',
                activeTab   : 0,
                width       : 760,
                height      : 260,
                items       : [{
                    xtype       : 'panel',
                    title       : 'Description',
                    items       : [{
                        xtype           : 'htmleditor',
                        enableColors    : true,
                        enableAlignments: true,
                        name            : 'description',
                        width           : 700,
                        height          : 250,
                        frame           : true,
                        layout          : 'fit',
                    }]
                }, {
                    xtype       : 'panel',
                    title       : 'Sample Interview Question',
                    items       : [{
                        xtype           : 'htmleditor',
                        enableColors    : true,
                        enableAlignments: true,
                        name            : 'interview_question',
                        width           : 560,
                        height          : 250,
                        frame           : true,
                        layout          : 'fit',
                    }]
                }, {
                    xtype       : 'panel',
                    title       : 'Competency Development Tips',
                    items       : [{
                        xtype           : 'htmleditor',
                        enableColors    : true,
                        enableAlignments: true,
                        name            : 'development_tips',
                        width           : 560,
                        height          : 250,
                        frame           : true,
                        layout          : 'fit',
                    }]
                }, {
                    xtype       : 'panel',
                    title       : 'Competency Development Media',
                    items       : [{
                        xtype           : 'htmleditor',
                        enableColors    : true,
                        enableAlignments: true,
                        name            : 'development_media',
                        width           : 560,
                        height          : 250,
                        frame           : true,
                        layout          : 'fit',
                    }]
                }]         
            }],

            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});