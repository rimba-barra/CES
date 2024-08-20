<?php

/**
 * Description of DataListCreator
 *
 * @author MIS
 */
class Gl_Box_Models_App_DataListCreator extends Gl_Box_Models_App_DataList {
    private $creator;
    private $extenseObjectVariables;
    public function __construct($dataDao, $master, $member, $aksesoris = array(),$extenseObjectVariables= NULL) {
        parent::__construct($dataDao, $master, $member, $aksesoris);
        $this->creator = new Gl_Box_Models_App_Creator();
        $this->extenseObjectVariables = $extenseObjectVariables;
    }
    public function getMaster() {
        $x = (string)parent::getMaster();
        return $this->creator->create($x);
    }
    
    /*edited 3 Maret 2014*/
    public function getEmbedMember() {
        $x = (array)parent::getEmbedMember();
        $y = array();
        foreach($x as $row){
            $name = NULL;
            $alias = NULL;
            $params = NULL;
            if(is_array($row)){
                $name = $row[0];
                $params = $row[1];
            }else{
                $name = (string)$row;
                $params = $this->extenseObjectVariables;
            }
           // $row = (string)$row;
            $y[] = $this->creator->create($name,$params);
        }
        return $y;
    }
}

?>
