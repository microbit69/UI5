sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format"
], function (Controller, Filter, FilterOperator, ChartFormatter, Format) {
    "use strict";

    return Controller.extend("analytics.controller.Dashboard", {

        onInit: function () {
            // Initialize chart formatting after view is rendered
            this.getView().attachAfterRendering(this._initCharts, this);
        },

        _initCharts: function () {
            // Register chart format
            Format.numericFormatter(ChartFormatter.getInstance());

            var oFormatPattern = ChartFormatter.DefaultPattern;

            // Configure Monthly Trend chart
            var oTrendChart = this.byId("chartMonthlyTrend");
            if (oTrendChart) {
                oTrendChart.setVizProperties({
                    plotArea: {
                        colorPalette: ["#0a6ed1", "#107e3e"],
                        dataLabel: { visible: false }
                    },
                    valueAxis: {
                        title: { text: "Umsatz (EUR)" },
                        label: { formatString: oFormatPattern.SHORTFLOAT }
                    },
                    valueAxis2: {
                        title: { text: "Gewinn (EUR)" },
                        label: { formatString: oFormatPattern.SHORTFLOAT }
                    },
                    categoryAxis: {
                        title: { visible: false }
                    },
                    legend: { visible: true },
                    title: { visible: false }
                });
            }

            // Configure Revenue by Region chart
            var oRegionChart = this.byId("chartRevenueByRegion");
            if (oRegionChart) {
                oRegionChart.setVizProperties({
                    plotArea: {
                        colorPalette: ["#0a6ed1"],
                        dataLabel: { visible: true, formatString: oFormatPattern.SHORTFLOAT }
                    },
                    valueAxis: {
                        title: { visible: false },
                        label: { formatString: oFormatPattern.SHORTFLOAT }
                    },
                    categoryAxis: {
                        title: { visible: false }
                    },
                    legend: { visible: false },
                    title: { visible: false }
                });
            }

            // Configure Product Category donut chart
            var oCategoryChart = this.byId("chartProductCategories");
            if (oCategoryChart) {
                oCategoryChart.setVizProperties({
                    plotArea: {
                        colorPalette: ["#0a6ed1", "#1a9898", "#107e3e", "#e9730c", "#bb0000", "#7800a4"],
                        dataLabel: {
                            visible: true,
                            type: "percentage"
                        }
                    },
                    legend: {
                        visible: true,
                        position: "right"
                    },
                    title: { visible: false }
                });
            }

            // Only run once
            this.getView().detachAfterRendering(this._initCharts, this);
        },

        formatCurrency: function (value) {
            if (value === undefined || value === null) {
                return "";
            }
            return parseFloat(value).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        },

        formatNumber: function (value) {
            if (value === undefined || value === null) {
                return "";
            }
            return parseInt(value, 10).toLocaleString("de-DE");
        },

        formatDate: function (value) {
            if (!value) {
                return "";
            }
            var oDate = new Date(value);
            return oDate.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        },

        formatStatusState: function (status) {
            switch (status) {
                case "Geliefert":
                    return "Success";
                case "Versandt":
                    return "Warning";
                case "In Bearbeitung":
                    return "Information";
                default:
                    return "None";
            }
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || "";
            var aFilters = [];

            if (sQuery) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("orderId", FilterOperator.Contains, sQuery),
                        new Filter("customer", FilterOperator.Contains, sQuery),
                        new Filter("product", FilterOperator.Contains, sQuery),
                        new Filter("region", FilterOperator.Contains, sQuery),
                        new Filter("category", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                }));
            }

            var oTable = this.byId("salesTable");
            oTable.getBinding("items").filter(aFilters);
        }
    });
});
