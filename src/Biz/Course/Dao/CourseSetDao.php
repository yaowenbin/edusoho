<?php

namespace Biz\Course\Dao;

use Codeages\Biz\Framework\Dao\GeneralDaoInterface;

interface CourseSetDao extends GeneralDaoInterface
{
    public function findByCourseId($courseId);
}
