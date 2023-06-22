import CollapsibleTest from './CollapsibleTest.svelte';
import { axeViolations } from '$test-helpers/axeTester.js';
import { describe } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { sleep } from '$lib/internal/helpers';

describe('Collapsible', () => {
	// test('No accesibility violations', async ({ mount, page }) => {
	// 	await mount(CollapsibleTest);
	// 	expect(await axeViolations(page)).toEqual([]);
	// });

	test('Toggles when clicked', async () => {
		const { getByTestId } = await render(CollapsibleTest);

		const trigger = getByTestId('trigger');

		await expect(trigger).toBeVisible();

		await expect(getByTestId('content')).not.toBeVisible();
		await trigger.click();
		await expect(getByTestId('content')).toBeVisible();
		await trigger.click();
		await expect(getByTestId('content')).not.toBeVisible();
	});

	test('Should be open when open prop is true', async () => {
		const { getByTestId } = render(CollapsibleTest, { open: true });
		await expect(getByTestId('content')).toBeVisible();
	});

	test('Should be closed when open prop is false', async () => {
		const { getByTestId } = render(CollapsibleTest, { open: false });
		await expect(getByTestId('content')).not.toBeVisible();
	});
});
