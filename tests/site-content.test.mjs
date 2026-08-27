import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const projectUrl = new URL('../', import.meta.url);

test('Given the booth page, when a visitor opens it, then the video is ready for mobile playback', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.match(pageSource, /<html lang="ko">/);
  assert.match(pageSource, /<video/);
  assert.match(pageSource, /controls/);
  assert.match(pageSource, /playsinline/);
  assert.match(pageSource, /media\/booth-intro\.mp4/);
  assert.match(pageSource, /<h1 id="page-title">광장 무한 상사<\/h1>/);
  assert.match(pageSource, /media\/gwangjang-muhan-sangsa-web\.png/);
  assert.match(pageSource, /alt="우리의 전도를 다시 ON 행사 홍보 이미지"/);
});

test('Given a QR visitor, when the page loads, then it asks for no login or personal information', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.doesNotMatch(pageSource, /<form/);
  assert.doesNotMatch(pageSource, /<input/);
  assert.match(pageSource, /개인정보 입력 없이/);
});

test('Given the public page, when its link is shared, then social metadata uses the deployed URL', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.match(pageSource, /property="og:title" content="광장 무한 상사"/);
  assert.match(pageSource, /https:\/\/wjddn144-ctrl\.github\.io\/booth-video-qr\//);
  assert.match(pageSource, /media\/gwangjang-muhan-sangsa-web\.png/);
});

test('Given a mobile QR visitor, when the page loads, then the hero image stays within a 5 MB transfer budget', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');
  const imageSource = pageSource.match(/class="hero-artwork"[\s\S]*?src="([^"]+)"/)?.[1];

  assert.ok(imageSource, 'The hero image source must be present.');

  const imageStats = await stat(new URL(imageSource, projectUrl));
  const fiveMegabytes = 5 * 1024 * 1024;

  assert.ok(
    imageStats.size <= fiveMegabytes,
    `The hero image is ${(imageStats.size / 1024 / 1024).toFixed(2)} MB; expected 5 MB or less for reliable mobile loading.`,
  );
});

test('Given the replacement video, when the page renders its player, then the summary and frame match the landscape media', async () => {
  const [pageSource, styleSource] = await Promise.all([
    readFile(new URL('index.html', projectUrl), 'utf8'),
    readFile(new URL('style.css', projectUrl), 'utf8'),
  ]);

  assert.match(pageSource, /<dd>약 4분 8초<\/dd>/);
  assert.match(pageSource, /<dd>가로형 영상<\/dd>/);
  assert.match(styleSource, /\.video-frame\s*\{[\s\S]*?aspect-ratio:\s*16\s*\/\s*9;/);
});
