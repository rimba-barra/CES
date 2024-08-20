<?php

/**
 * Description of AbConvertedData
 *
 * @author MIS
 */
abstract class Erems_Box_Kouti_AbDataList {

    private $dataDao;

    public function __construct($dataDao) {
        $this->dataDao = $dataDao;
    }

    public function getDataDao() {
        return $this->dataDao;
    }

    public function setDataDao($dataDao) {
        $this->dataDao = $dataDao;
    }

    public final function getTotalRow() {
        return $this->dataDao[0][0]['totalRow'];
    }

    protected final function getData() {
        if (!empty($this->dataDao[1])) {
            return $this->dataDao[1];
        }
        return NULL;
    }

    public final function getList() {
        $arDetail = array();
        $data = $this->getData();
        if ($data != NULL) {
            foreach ($data as $row) {
                $groupEmbed = $this->getEmbedMember();
                
                $converter = new Erems_Box_Models_App_Converter($row);
                $converter->process($groupEmbed);
                $x = $this->getMaster();
                $x->setArrayTable($row);
                $this->insertAksesorisValue($row);
                $x->setGroupedEmbed($groupEmbed);
                $arDetail[] = $x;
            }
        }

        return $arDetail;
    }
    
    protected function insertAksesorisValue($row){
        $a = $this->getAksesoris();
        if(count($a)> 0){
            foreach($a as $r){
               if(array_key_exists($r,$row)){
                  // var_dump($row[$r]);
               } 
            }
        }
    }

    abstract function getEmbedMember();
    abstract function getAksesoris();
    abstract function getMaster();
}

?>
