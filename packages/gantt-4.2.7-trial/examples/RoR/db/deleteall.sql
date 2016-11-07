DELETE FROM dependencies;
DELETE FROM tasks;
delete from sqlite_sequence where name='dependencies';
delete from sqlite_sequence where name='tasks';