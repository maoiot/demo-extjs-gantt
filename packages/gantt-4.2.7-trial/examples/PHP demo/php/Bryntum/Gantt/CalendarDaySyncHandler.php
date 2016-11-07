<?php

namespace Bryntum\Gantt;

class CalendarDaySyncHandler extends \Bryntum\CRUD\SyncHandler
{

    private $gantt;
    private $calendarId;

    public function __construct(&$gantt)
    {
        $this->gantt = &$gantt;
    }

    public function setCalendarId($calendarId)
    {
        $this->calendarId = $calendarId;
    }

    /**
     * Processes a date field value. Takes into account only date info (w/o time and timezone info).
     * @param  string $date Date string
     * @return string       Processed date string
     */
    protected function processDate($date)
    {
        $tmp = date_parse($date);

        return date('Y-m-d H:i:s', mktime(0, 0, 0, $tmp['month'], $tmp['day'], $tmp['year']));
    }

    public function prepareData(&$data)
    {
        $response = array();

        if (isset($data['Type'])) {
            $data['Typ'] = $data['Type'];
            unset($data['Type']);
        }

        if (isset($data['Date'])) {
            $data['Dt'] = $this->processDate($data['Date']);

            unset($data['Date']);
        }

        if (isset($data['OverrideStartDate'])) {
            $data['OverrideStartDate'] = $this->processDate($data['OverrideStartDate']);
        }

        if (isset($data['OverrideEndDate'])) {
            $data['OverrideEndDate'] = $this->processDate($data['OverrideEndDate']);
        }

        if (isset($data['IsWorkingDay'])) {
            $data['IsWorkingDay'] = intval($data['IsWorkingDay']);
        }

        if (isset($data['Availability'])) {
            $data['Availability'] = implode('|', (array)$data['Availability']);
        }

        if ($this->calendarId) {
            $data['calendarId'] = $this->calendarId;
        }

        $phantomIdMap = &$this->gantt->phantomIdMap['calendars'];
        if (isset($phantomIdMap[$data['calendarId']])) {
            // use & return actual Id
            $data['calendarId'] = $response['calendarId'] = $phantomIdMap[$data['calendarId']];
        }

        return $response;
    }

    public function add(&$calendarDay)
    {
        $response = $this->prepareData($calendarDay);
        $this->gantt->saveCalendarDay($calendarDay);
        return $response;
    }

    public function update(&$calendarDay)
    {
        $response = $this->prepareData($calendarDay);
        $this->gantt->saveCalendarDay($calendarDay);
        return $response;
    }

    public function remove($calendarDay)
    {
        $response = array();
        $this->gantt->removeCalendarDays($calendarDay);
        return $response;
    }
}
