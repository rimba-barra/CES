<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Main
 *
 * @author MIS
 */
abstract class Box_Converter_Main {

    private $arrayDao;

    public function __construct($arrayDao = array()) {

        $this->arrayDao = $arrayDao;
    }

    public function process(&$groupEmbed) {
        //echo count($groupEmbed);
        $prefixFounded = $this->kumpulinPrefix($groupEmbed);
        
        $hasilKumpulinParams = $this->kumpulinParams($prefixFounded);
      
        foreach ($hasilKumpulinParams as $prefix => $val) {
            foreach ($val['data'] as $key => $v) {

                $groupEmbed[$val['pos']]->setParamByIndexArray($key, $v);
            }
            $groupEmbed[$val['pos']]->setArrayTable();
        }
    }

    protected function kumpulinPrefix($groupEmbed) {
        $prefixFounded = array();
        for ($i = 0; $i < count($groupEmbed); $i++) {
            if ($groupEmbed[$i] instanceof Box_Converter_EmbedData) {
                $prefix = $groupEmbed[$i]->getPrefixTable();
                $prefixFounded[$prefix] = array('pos' => $i, 'data' => array());
            }
        }
       
        return $prefixFounded;
    }

    /* array params */

    protected function kumpulinParams($prefixFounded) {
        $ad = $this->arrayDao;
        if (count($prefixFounded) > 0) {
            foreach ($prefixFounded as $prefix => $val) {
                if (is_array($ad)) {
                    foreach ($ad as $row => $value) {

                        if (strstr($row, $prefix)) {
                            $paramFound = substr($row, strlen($prefix), strlen($row));

                            $prefixFounded[$prefix]['data'][$paramFound] = $value;
                        }
                    }
                }
            }
        }
        
        return $prefixFounded;
    }

    protected function checkGroupedEmbed($rowDao, &$groupEmbed) {


        /*
          foreach ($dataArray as $k => $v) {
          foreach ($registedPrefix as $row) {
          if (strstr($k, $row)) {
          $key = substr($k, strlen($row), strlen($k));
          if (!key_exists($row, $groupedClass)) {
          $groupedClass[$row] = array();
          }
          $groupedClass[$row][$key] = $v;
          // $groupingModel->createObject();
          }
          }
          }
          $groupingModel->createObject($groupedClass);
         */
    }

    public function getArrayDao() {
        return $this->arrayDao;
    }

    public function setArrayDao($arrayDao) {
        $this->arrayDao = $arrayDao;
    }

}

?>
