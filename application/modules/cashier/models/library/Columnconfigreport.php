<?php 

class Columnconfigreport {

    var $config = array();
    var $object = array();
    var $header = array();
    var $footer = array();
    var $footer_as_data = false;
    var $bold_last_row = false;
    var $bold_header = true;
    var $sp;
    var $sp_param;
    var $titlesheet;
    var $sheetnumber;
    var $column_title = array();
    var $fieldcondition = array();
    var $removecols;
    var $mergedcell = array();
    var $customstyle = array();
    var $content = array();

    function setSheetNumber($sheetnumber) {
        $this->sheetnumber = $sheetnumber;
    }

    function setTitleSheet($titlesheet = 0) {
        $this->titlesheet = $titlesheet;
    } 

    function setHeader($header) {

        $this->header[] = $header;
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

    function setColumnTitle($titles) {
        $this->column_title[] = $titles;
    }

    function setBoldLastRow($bool) {
        $this->bold_last_row = $bool;
    }

    function setCondition($field, $operator, $condition, $isBold = true) {
        $this->fieldcondition[] = array(
            'field' => $field,
            'operator' => $operator,
            'condition' => $condition,
            'bold' => $isBold
        );
    }

    function setRemoveColumn($cols) {
        $this->removecols = $cols;
    }   

    function setConfig($name, $width = 25, $align = "left", $format = null) {
        $this->config[$name] = array(
            "name" => $name,
            "width" => $width,
            "align" => $align,
            "format" => $format
        );
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

        if ($this->sp == "") {
            $this->sp = "cashier.dbo.sp_getprojectbypt";
        }

        if ($this->sp_param == "") {
            $this->sp_param = "4223";
        }

        if (empty($this->config)) {
            $this->config['project_id'] = array(
                "name" => 'project_id',
                "width" => 20,
                "align" => 'left',
                "format" => null
            );
        }

        $this->object[] = array(
            'sheet' => $this->sheetnumber,
            'content' => array(
                'title' => $this->titlesheet,
                'header' => $this->header,
                'footer' => $this->footer,
                'footer_as_data' => $this->footer_as_data,
                'content' => $this->content,
                'data' => array(
                    'sp' => $this->sp,
                    'sp_param' => $this->sp_param,
                    'column_title' => $this->column_title,
                    'column_config' => $this->config
                )
            ),
            'style' => array(
                'bold_last_row' => $this->bold_last_row,
                'bold_header' => $this->bold_header
            ),
            'condition' => array($this->fieldcondition),
            'remove_columns' => $this->removecols,
            'merge_cell' => $this->mergedcell,
            'custom_style' => $this->customstyle
        );
        
        $this->cleanarray();
        return $this->object;
    }

    function cleanarray() {

        $this->header = array();
        $this->footer = array();
        $this->column_title = array();
        $this->config = array();
        $this->mergedcell = array();
        $this->customstyle = array();
        $this->content = array();
    }

    function getQuery(){
        return $this->sp . $this->sp_param;
    }
}