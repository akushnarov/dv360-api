
/**
    Copyright 2020 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

/**
 * This is a test file, which is based on [jest](https://jestjs.io/docs/en/getting-started.html).
 * In order to run the test just use a shell command:
 * ```
 * ~$ npm run test
 * ```
 */

const Utils = require('../classes/utils.gs');

test('encodeParameters', () => {
    const params = {'foo': 1, 'bar': 2};
    expect(Utils.encodeParameters(params)).toBe('foo=1&bar=2');
});

test('getValueFromJSON', () => {
    let json = {
        'foo': [
            {
                'foo1': 'bar1'
            },
            {
                'foo2': 'bar2'
            },
        ], 
        'bar': {
            'bar1': 'foo1',
        }
    };

    expect(
        Utils.getValueFromJSON('foo.0.foo1', json)
    ).toBe('bar1');

    expect(
        Utils.getValueFromJSON('foo.1.foo2', json)
    ).toBe('bar2');

    expect(
        Utils.getValueFromJSON('bar.bar1', json)
    ).toBe('foo1');

    json = {
        'daily': [
            {
                'weather': {
                    'id': 123
                }
            },
            {
                'foo2': 'bar2'
            },
        ], 
        'bar': {
            'bar1': 'foo1',
        }
    };

    expect(
        Utils.getValueFromJSON('daily.0.weather.id', json)
    ).toBe(123);
});

test('getApiHeaders', () => {
    const headers = [
        'no api header 1',
        'api:header1',
        'no api header 2',
        'api:header2'
    ];
    expect(Utils.getApiHeaders(headers)).toStrictEqual(
        {'header1': 1, 'header2': 3}
    );
});