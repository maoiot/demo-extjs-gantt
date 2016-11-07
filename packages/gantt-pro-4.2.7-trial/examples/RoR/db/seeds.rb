# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Task.create([
                {Name: 'Investigation', StartDate: DateTime.parse('2017-01-01'), Duration: 8, DurationUnit: 'd'},
                {Name: 'Meetings', StartDate: DateTime.parse('2017-01-01'), Duration: 8, DurationUnit: 'd', ParentId: 1},
                {Name: 'Meeting 1', StartDate: DateTime.parse('2017-01-01'), Duration: 2, DurationUnit: 'd', ParentId: 2},
                {Name: 'Meeting 2', StartDate: DateTime.parse('2017-01-04'), Duration: 2, DurationUnit: 'd', ParentId: 2},
                {Name: 'Specs', StartDate: DateTime.parse('2017-01-06'), Duration: 4, DurationUnit: 'd', ParentId: 1},
                {Name: 'Implementation', StartDate: DateTime.parse('2017-01-12'), Duration: 10, DurationUnit: 'd'},
                {Name: 'Database', StartDate: DateTime.parse('2017-01-12'), Duration: 3, DurationUnit: 'd', ParentId: 6},
                {Name: 'Code', StartDate: DateTime.parse('2017-01-17'), Duration: 6, DurationUnit: 'd', ParentId: 6},
                {Name: 'Docs', StartDate: DateTime.parse('2017-01-25'), Duration: 1, DurationUnit: 'd', ParentId: 6},
            ])

Dependency.create([
                      {From: 3, To: 4, Type: 2},
                      {From: 4, To: 5, Type: 2},
                      {From: 7, To: 8, Type: 2},
                      {From: 8, To: 9, Type: 2}
                  ])