<?php
namespace Bryntum\Scheduler;

define(__NAMESPACE__.'\E_APP_UPDATE_EVENT', 20);
define(__NAMESPACE__.'\E_APP_ADD_EVENT', 21);
define(__NAMESPACE__.'\E_APP_REMOVE_EVENT', 22);
define(__NAMESPACE__.'\E_APP_GET_EVENTS', 23);
define(__NAMESPACE__.'\E_APP_UPDATE_RESOURCE', 30);
define(__NAMESPACE__.'\E_APP_ADD_RESOURCE', 31);
define(__NAMESPACE__.'\E_APP_REMOVE_RESOURCE', 32);
define(__NAMESPACE__.'\E_APP_REMOVE_USED_RESOURCE', 33);
define(__NAMESPACE__.'\E_APP_GET_RESOURCES', 34);

class Scheduler extends \Bryntum\CRUD\BaseDAO
{
    protected $event_table = 'events';
    protected $resource_table = 'resources';

    public function __construct($dsn, $dbuser, $dbpwd, $dboptions = null)
    {
        // call parent
        parent::__construct($dsn, $dbuser, $dbpwd, $dboptions);

        $this->phantomIdMap = array(
            'resources' => array()
        );
    }

    /**
     * Creates/updates event record.
     */
    public function saveEvent(&$data)
    {
        // Process datetime fields (turns field values to the server timezone)

        if (isset($data['StartDate']) && $data['StartDate']) {
            $data['StartDate'] = date('Y-m-d H:i:s', strtotime($data['StartDate']));
        }

        if (isset($data['EndDate']) && $data['EndDate']) {
            $data['EndDate'] = date('Y-m-d H:i:s', strtotime($data['EndDate']));
        }

        if (@$data['Id']) {
            if (!$this->update($this->event_table, $data, array('Id' => $data['Id']))) {
                throw new \Exception('Cannot update event #'.$data['Id'].'.', E_APP_UPDATE_EVENT);
            }

        } else {
            if (!$this->insert($this->event_table, $data)) {
                throw new \Exception('Cannot create event.', E_APP_ADD_EVENT);
            }

            $data['Id'] = $this->db->lastInsertId();
        }

        $this->updateRevision();
    }

    /**
     * Removes event record.
     */
    public function removeEvent($data)
    {
        if (!$this->db->query("delete from {$this->event_table} where Id = ".intval($data['Id']))) {
            throw new \Exception('Cannot remove event #'.$data['Id'].'.', E_APP_REMOVE_EVENT);
        }

        $this->updateRevision();
    }

    /**
     * Returns array of events.
     */
    public function getEvents($params, $where = null)
    {
        $start = $limit = null;
        if ($params) {
            list($start, $limit) = self::getStartLimit($params);
        }

        $values = array();
        $cond = $where ? ' where '.self::buildWhere($where, $values) : '';

        $stmt = $this->db->prepare("select sql_calc_found_rows * from {$this->event_table} ".$cond.($start || $limit ? " limit $start , $limit" : ''));

        if (!$stmt->execute($values)) {
            throw new \Exception('Cannot get events list.', E_APP_GET_EVENTS);
        }

        $rows = array();
        while ($e = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $e['Id']            = intval($e['Id']);
            $e['ResourceId']    = intval($e['ResourceId']);
            $e['Resizable']     = $e['Resizable'] == 1;
            $e['Draggable']     = $e['Draggable'] == 1;

            // Force datetime fields to include server timezone info
            if (@$e['StartDate']) {
                $e['StartDate'] = date('Y-m-d H:i:sP', strtotime($e['StartDate']));
            }
            if (@$e['EndDate']) {
                $e['EndDate']   = date('Y-m-d H:i:sP', strtotime($e['EndDate']));
            }

            $rows[] = $e;
        }

        return $rows;
    }

    /**
     * Creates/updates resource record.
     */
    public function saveResource(&$data)
    {
        if (@$data['Id']) {
            if (!$this->update($this->resource_table, $data, array('Id' => $data['Id']))) {
                throw new \Exception('Cannot update resource #'.$data['Id'].'.', E_APP_UPDATE_RESOURCE);
            }

        } else {
            if (!$this->insert($this->resource_table, $data)) {
                throw new \Exception('Cannot create resource.', E_APP_ADD_RESOURCE);
            }

            $data['Id'] = $this->db->lastInsertId();
        }

        $this->updateRevision();
    }

    /**
     * Removes resource record.
     */
    public function removeResource($data)
    {
        $id = intval($data['Id']);

        if ($this->getEvents(null, array('ResourceId' => $id))) {
            throw new \Exception('Cannot remove assigned resource #'.$id.'.', E_APP_REMOVE_USED_RESOURCE);
        }

        if (!$this->db->query("delete from {$this->resource_table} where Id = ".intval($data['Id']))) {
            throw new \Exception('Cannot remove resource #'.$data['Id'].'.', E_APP_REMOVE_RESOURCE);
        }

        $this->updateRevision();
    }

    /**
     * Returns array of resources.
     */
    public function getResources($params)
    {
        $start = $limit = null;

        if ($params) {
            list($start, $limit) = self::getStartLimit($params);
        }

        if (!$r = $this->db->query("select sql_calc_found_rows * from {$this->resource_table}".($start || $limit ? " limit $start , $limit" : ''))) {
            throw new \Exception('Cannot get resources list.', E_APP_GET_RESOURCES);
        }

        $rows = array();
        while ($e = $r->fetch(\PDO::FETCH_ASSOC)) {
            $e['Id'] = intval($e['Id']);
            $rows[] = $e;
        }

        return $rows;
    }
}
