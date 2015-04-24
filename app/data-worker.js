/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

importScripts(
  'bower_components/es6-promise-2.0.1.min/index.js',
  'scripts/helper/request.js',
  'scripts/helper/schedule.js'
);

var schedulePromise = IOWA.Schedule.fetchSchedule();

addEventListener('message', function(e) {

  switch (e.data.cmd) {
    case 'FETCH_SCHEDULE':
      schedulePromise.then(function(scheduleData) {
        var tags = IOWA.Schedule.generateFilters(scheduleData.tags);
        postMessage({scheduleData: scheduleData, tags: tags});

        self.close(); // Terminate worker.
      });

      break;

    default:
      break;
  }

});