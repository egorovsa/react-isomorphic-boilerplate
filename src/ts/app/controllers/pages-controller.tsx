import * as React from "react";
import {AppController} from "./app-controller";
import {UtilsService} from "../services/utils-service";
import CONFIG from "../../config/config";

export class PagesController extends AppController {
	constructor(data) {
		super(data);
	}

	public async main() {
		this.setMetaData({
			title: CONFIG.TITLE
		})
	}

	public async controllersExplanations() {
		this.setMetaData({
			title: 'Controllers'
		})
	}

	public async view() {
		this.setMetaData({
			title: 'Creating view layer'
		});
	}

	public simple(test) {
		this.set({
			test: test
		});

		this.setMetaData({
			title: 'How to create a simple page'
		});
	}

	public async index(slug) {
		UtilsService.scrollToTop();
		this.showMainLoading();

		if (slug) {
			try {
				const page = await this.apiRequest.pages.getPageDataBySlug(slug);

				this.set({
					page: page
				});

				this.setMetaData({
					title: page.seo_title,
					description: page.seo_description,
					keywords: page.seo_keywords
				});
			} catch (e) {
				this.pageNotFound();
			}
		} else {
			this.pageNotFound();
		}

		this.hideMainLoading();
	}

	public async beforeFilter(data) {
		await super.beforeFilter(data);
	}
}