<?php

/**
 * Description of HasRelation
 *
 * @author MIS
 */
interface Gl_Box_Models_App_Hermes_HasRelation {
    /*@return array*/
    function getIndexNames();
    /*@params string $indexName 
     *@return object
     */
    function getRelationObject($indexName);
    /*@params object @object
     *@params string @indexName
     */
    function addRelationObject($object,$indexName);
    
    function setSelectedRelation($indexName);
}

?>
