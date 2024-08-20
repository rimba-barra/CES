<?php 

class Columnconfigreportv2 {

    var $config = array();
    var $object = array();
    var $header = array();
    var $headerTable = array();
    var $headerTableStyle = array();
    var $footer = array();
    var $footer_as_data = false;
    var $bold_last_row = false;
    var $bold_header = true;
    var $sp;
    var $sp_param;
    var $titlesheet;
    var $sheetnumber;
    var $column_title = array();
    var $column_width = array();
    var $column_align = array();
    var $column_format = array();
    var $fieldcondition = array();
    var $removecols;
    var $hiddencols;
    var $mergedcell = array();
    var $customstyle = array();
    var $content = array();
    var $useCustomHeaderTable = false;
    
    private $columns = [];
    private $query = "";
    private $column_config = [];

    // unused
    function setSheetNumber($sheetnumber) {
        $this->sheetnumber = $sheetnumber;
    }

    function setTitleSheet($titlesheet) {
        $this->titlesheet = $titlesheet;
    } 

    function setQuery($query) {
        $this->query = $query;
    }

    function getQuery(){
        return $this->query;
    }

    function setColumn($columns) {
        $this->columns[] = $columns;

        foreach ($columns as $col) {
            $this->setTableConfig($col);
        }
    }

    function setTableTitle($column_name, $column_title) {
        // $this->column_config[$column_name]['title'] = $column_title;
        $this->column_title[$column_name] = $column_title; 
    }

    function setTableWidth($column_name, $column_width) {
        // $this->column_config[$column_name]['width'] = $column_width;
        $this->column_width[$column_name] = $column_width;
    }

    function setTableAlign($column_name, $column_align) {
        // $this->column_config[$column_name]['align'] = $column_align;
        $this->column_align[$column_name] = $column_align;
    }

    function setTableFormat($column_name, $column_format) {
        // $this->column_config[$column_name]['format'] = $column_format;
        $this->column_format[$column_name] = $column_format;
    }

    function setHeader($header) {
        $this->header[] = $header;
    }

    function setHeaderTable($headerTable, $headerTableStyle = "") {

        if ($headerTableStyle == "") {
            $headerTableStyle = array(
                'bold' => true,
                'font_size' => 11,
                'font_color' => '2F4F4F',
                'valign' => 'vcenter',
                'align' => 'center',
                'border' => true  
            );
        }

        $this->headerTable[] = $headerTable;
        $this->headerTableStyle[] = $headerTableStyle;
    }

    function setBoldHeader($isBold = true) {
        $this->bold_header = $isBold;
    }

    function setFooter($footer, $asData = true) {

        $this->footer[] = $footer;
        $this->footer_as_data = $asData;
    }

    function setSP($sp) {
        $this->sp = $sp;
    }

    function setSPParam($param = array('4223')) {
        $this->sp_param = "'".implode("','", $param)."'";
    }

    // function setColumnTitle($titles) {
    //     $this->column_title[] = $titles;
    // }

    function setBoldLastRow($bool) {
        $this->bold_last_row = $bool;
    }

    function setFormatWithCondition($field, $operator, $condition, $format) {
        $this->fieldcondition[][$field] = array(
            'operator' => $operator,
            'condition' => $condition,
            'format' => $format
        );
    }

    function setRemoveColumn($cols) {
        $this->removecols = $cols;
    }   

    function setHiddenColumn($cols) {
        $this->hiddencols = $cols;
    }   

    function setTableConfig($name, $title = "UNTITLED", $width = 25, $align = "left", $format = null) {
        $this->setTableTitle($name, $title);
        $this->setTableAlign($name, $align);
        $this->setTableWidth($name, $width);
        $this->setTableFormat($name, $format);
    }

    function setMergedCell($from, $to, $vertical_align = "center", $horizontal_align = "center") {
        $this->mergedcell[] = array('from' => $from, 'to' => $to, 'vertical_align' => $vertical_align, 'horizontal_align' => $horizontal_align);
    }

    function setCustomStyle($from = "", $to = "", $col = "", $val = "", $bold = "True", $align = "left", $format = "None", $border = "False", $borderconfig = "") {

        /* 
            set custom style bisa berdasarkan range kolom atau nilai dari suatu kolom berdasarkan title dari kolom tersebut
            yang di define di column_config. 

            jika ingin berdasarkan range kolom, maka variable $col dan $val dikosongkan saja.
            Namun jika ingin berdasarkan value dari kolom tertentu, untuk rangenya diisi huruf dari kolom di excel saja
        */

        if (!isset($borderconfig['style'])) {
            $borderconfig['style'] = "thin";
        }

        if (!isset($borderconfig['bordertop'])) {
            $borderconfig['bordertop'] = "False";
        }

        if (!isset($borderconfig['borderbottom'])) {
            $borderconfig['borderbottom'] = "False";
        }

        if (!isset($borderconfig['borderleft'])) {
            $borderconfig['borderleft'] = "False";
        }

        if (!isset($borderconfig['borderright'])) {
            $borderconfig['borderright'] = "False";
        }

        if (!isset($borderconfig['allborders'])) {
            $borderconfig['allborders'] = "False";
        }

        if (!isset($borderconfig['bordercolor'])) {
            $borderconfig['bordercolor'] = "000000";
        }

        $this->customstyle[] = array(
            'from' => $from, 
            'to' => $to, 
            'col' => $col,
            'val' => $val,
            'bold' => $bold, 
            'align' => $align, 
            'format' => $format, 
            'border' => $border,
            'borderconfig' => $borderconfig
        );
    }

    function setContent($sp_name, $sp_param, $definedValue) {
        $this->content[] = array(
            'sp_name' => $sp_name,
            'sp_param' => $sp_param == "" ? "" : "'".implode("','", $sp_param)."'",
            'definedValue' => $definedValue
        );
    }

    function generateJSONConfig() {

        $this->object[] = [
            'title' => $this->titlesheet,
            'contents' => [
                'query' => $this->query,
                'column' => $this->columns[0],
                'column_config' => [
                    'column_title' => $this->column_title,
                    'column_width' => $this->column_width,
                    'column_align' => $this->column_align,
                    'column_format' => $this->column_format,
                ],
                'header' => $this->header,
                'headerTable' => $this->headerTable,
                'useCustomHeaderTable' => $this->useCustomHeaderTable,
                'hiddenColumns' => $this->hiddencols
            ],
            'styles' => [
                'setConditionalFormatting' => $this->fieldcondition,
                'headerTableStyle' => $this->headerTableStyle,
            ],
        ];

        // if ($this->sp == "") {
        //     $this->sp = "cashier.dbo.sp_getprojectbypt";
        // }

        // if ($this->sp_param == "") {
        //     $this->sp_param = "4223";
        // }

        // if (empty($this->config)) {
        //     $this->config['project_id'] = array(
        //         "name" => 'project_id',
        //         "width" => 20,
        //         "align" => 'left',
        //         "format" => null
        //     );
        // }

        // $this->object[] = array(
        //     'sheet' => $this->sheetnumber,
        //     'content' => array(
        //         'title' => $this->titlesheet,
        //         'header' => $this->header,
        //         'footer' => $this->footer,
        //         'footer_as_data' => $this->footer_as_data,
        //         'content' => $this->content,
        //         'data' => array(
        //             'sp' => $this->sp,
        //             'sp_param' => $this->sp_param,
        //             'column_title' => $this->column_title,
        //             'column_config' => $this->config
        //         )
        //     ),
        //     'style' => array(
        //         'bold_last_row' => $this->bold_last_row,
        //         'bold_header' => $this->bold_header
        //     ),
        //     'condition' => array($this->fieldcondition),
        //     'remove_columns' => $this->removecols,
        //     'merge_cell' => $this->mergedcell,
        //     'custom_style' => $this->customstyle
        // );
        
        $this->cleanarray();
        return $this->object;
    }

    function cleanarray() {

        $this->columns = [];
        $this->header = [];
        $this->headerTable = [];
        $this->column_title = [];
        $this->column_align = [];
        $this->column_width = [];
        $this->column_format = [];
        $this->fieldcondition = [];

        // $this->header = array();
        // $this->footer = array();
        // $this->column_title = array();
        // $this->config = array();
        // $this->mergedcell = array();
        // $this->customstyle = array();
        // $this->content = array();
    }
}