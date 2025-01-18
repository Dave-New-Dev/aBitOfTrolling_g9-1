/**
 * Disable Page Visibility API
 * Copyright (C) 2021 Marvin Schopf
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


// Dealing with page visibility API:
/* If problem arises, replace 'window' with 'document' */
Object.defineProperty(window, "visibilityState", {
    get: () => "visible",
});

Object.defineProperty(window, "hidden", {
    get: () => false,
});

window.addEventListener(
	"visibilitychange",
	function (event) {
		event.stopImmediatePropagation();
	},
	true
);

window.addEventListener(
	"webkitvisibilitychange",
	function (event) {
		event.stopImmediatePropagation();
	},
	true
);

// Dealing with (simulating) blur and focus events:
window.addEventListener(
	"blur",
	function (event) {
		event.stopImmediatePropagation();
	},
	true
);

window.addEventListener(
	"focus",
	function (event) {
		event.stopImmediatePropagation();
	},
	true
);

// Dealing with (spoofing) heartbeat monitoring:
const originalSetInterval = window.setInterval;
window.setInterval = (callback, delay) => originalSetInterval(callback, delay <= 1000 ? delay : 1000);

// Dealing with (spoofing) websocket and polling:
setInterval(() => {
	fetch("https://example.com/heartbeat").then((response) => response.json());
	},
	1000
);

// Dealing with media query triggers (e.g. change in window size or focus)
const originalMatchMedia = window.matchMedia;
window.matchMedia = (query) => ({
    matches: true,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
});

// Dealing with (spoofing) cpu throttling:
const originalPerformanceNow = performance.now;
performance.now = () => originalPerformanceNow() + 16; // simulate around 60fps
