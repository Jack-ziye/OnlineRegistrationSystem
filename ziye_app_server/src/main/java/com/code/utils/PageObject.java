package com.code.utils;

public class PageObject {

	private int pageNum;
	private int pageSize;
	private long totalPages;
	private Object content;

	public int getPageNum() {
		return pageNum;
	}

	public PageObject setPageNum(int pageNo) {
		this.pageNum = pageNo;
		return this;

	}
	public int getPageSize() {
		return pageSize;
	}
	public PageObject setPageSize(int pageSize) {
		this.pageSize = pageSize;
		return this;
	}
	public long getTotalPages() {
		return totalPages;
	}
	public PageObject setTotalPages(long totalPages) {
		this.totalPages = totalPages;
		return this;
	}
	public Object getContent() {
		return content;
	}
	public PageObject setContent(Object content) {
		this.content = content;
		return this;
	}

}