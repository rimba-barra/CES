<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HasilRequestRead
 *
 * @author MIS
 */
class Master_Box_Models_App_HasilRequestRead extends Master_Box_Kouti_Hasil {

    private $modeRead;
    private $page;
    private $limit;
    private $others;
    private $module;
    private $xml;

    public function __construct($array) {
        $this->modeRead = 'all';
        $this->page = 1;
        $this->limit = 25;
        $this->others = array();
        $this->module = '';
        $this->setForm(array("mode_read" => "", "page" => 1, "limit" => 25, "module" => "", "others" => array()));
        $this->setArrayForm($array);
        /* ExtJS based */

        $limit = $this->getLimit() == 0 ? 9999 : $this->getLimit();
        $actualPage = floor((int) $this->getOthersValue("start") / $limit);

        $actualPage = (int) ($actualPage + 1);
        $this->page = $actualPage;
    }

    public function getModeRead() {
        return $this->modeRead;
    }

    public function setModeRead($modeRead) {
        $this->modeRead = $modeRead;
    }

    public function getPage() {
        return $this->page;
    }

    public function setPage($page) {
        $this->page = $page;
    }

    public function getLimit() {
        return $this->limit;
    }

    public function setLimit($limit) {
        $this->limit = $limit;
    }

    public function getOthers() {
        return $this->others;
    }

    public function setOthers($others) {
        $this->others = $others;
    }

    public function getModule() {
        return $this->module;
    }

    public function setModule($module) {

        $this->module = $module;
    }

    function getXml() {
        return $this->xml;
    }

    function setXml($xml) {
        $this->xml = $xml;
    }

    protected function setFormFromParams() {
        $form = $this->getForm();
        $form["mode_read"] = $this->modeRead;
        $form["page"] = $this->page;
        $form["limit"] = $this->limit;
        $form["others"] = $this->others;
        $form["module"] = $this->module;

        return $form;
    }

    protected function setParamsFromForm() {
        $form = $this->getForm();
        $this->modeRead = $form["mode_read"];
        $this->page = $form["page"];
        $this->limit = $form["limit"];
        $this->others = $form["others"];
        $this->module = $form["module"];
    }

    public function setArrayForm($array) {
        $form = $this->getForm();
        foreach ($array as $key => $value) {

            if (key_exists($key, $form)) {

                $form[$key] = $value;
            } else {
                $form["others"][$key] = $value;
            }
        }

        $this->setForm($form);
        $this->setParamsFromForm();
    }

    public function getOthersValue($key) {
        $hasil = "";
        if (key_exists($key, $this->others)) {
            $hasil = $this->others[$key];
        }
        return $hasil;
    }

    public function getXmlValue() {
        $hasil = "";
        if (!empty($this->others)) {
            $formSearch = $this->others;

            if ($formSearch) {
                unset($formSearch['btab_sessid'], $formSearch['start']);
                $array = $formSearch;
                $xml = new Master_Helpers_Functionmodule;
                $hasil = $xml->array_to_xml($array);
            }
        }
        return $hasil;
    }

    public function getXmlData() {
        $hasil = "";
        if (!empty($this->others)) {
            $formSearch = $this->others;
            if ($formSearch) {
                unset($formSearch['btab_sessid'], $formSearch['start']);
                $array = json_decode($formSearch['data'], true);
                unset($array['deletedRows']);
                $xml = new Master_Helpers_Functionmodule;
                $hasil = $xml->array_to_xml($array);
            }
        }
        return $hasil;
    }

    public function getDataArray() {
        $hasil = array();
        if (!empty($this->others)) {
            $form = $this->others;
            unset($form['btab_sessid']);
            $hasil = json_decode($form['data'], true);
        }
        return $hasil;
    }

    public function getDataArrayValue($key) {
        $hasil = array();
        if (!empty($this->others)) {
            $form = $this->others;
            unset($form['btab_sessid']);
            $decode = json_decode($form['data'], true);
            if (key_exists($key, $decode)) {
                $hasil = $decode[$key];
            }
        }
        return $hasil;
    }

    public function getXmlDataUnset($unset) {
        $hasil = "";
        if (!empty($this->others)) {
            $formSearch = $this->others;
            if ($formSearch) {
                unset($formSearch['btab_sessid'], $formSearch['start']);
                $array = json_decode($formSearch['data'], true);
                if (count($unset) > 0) {
                    foreach ($unset as $row) {
                        unset($array[$row]);
                    }
                }
                unset($array['deletedRows']);
                $xml = new Master_Helpers_Functionmodule;
                $hasil = $xml->array_to_xml($array);
            }
        }

        return $hasil;
    }

    public function setOthersValue($key, $value) {
        $this->others[$key] = $value;
    }

}

?>
